/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2015 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
(function (window, undefined) {
    /**
     *
     * @param group {String} group identifier name
     * @param [targetWindow=window.parent]
     * @param [origin='*']
     * @constructor
     */
    function MessageChannel(group, targetWindow, origin) {
        this._msgNo = 1;
        this._group = group;
        this._origin = '*' || origin;
        this._requestHandler = {};
        this._messageQueue = {};
        this._targetWindow = targetWindow || window.parent;

        window.addEventListener('message', receiveMessage.bind(this), false);
    }

    /**
     * subscribe to a request message
     *
     * @param msg identifier
     * @param callback
     */
    MessageChannel.prototype.subscribeRequestMessage = function (msg, callback) {
        this._requestHandler[msg] = this._requestHandler[msg] || [];
        this._requestHandler[msg].push(callback);
    };

    /**
     * unsubscribe to a request message
     *
     * @param msg identifier
     * @param callback
     */
    MessageChannel.prototype.unsubscribeRequestMessage = function (msg, callback) {
        var idx = this._requestHandler[msg].indexOf(callback);
        this._requestHandler[msg].splice(idx, 1);
    };

    /**
     * this function will send a message to the editor frame
     *
     * @param msg {String} message identifier
     * @param data {Object} Plain JSON object with data to transfer
     * @param timeout {Number} if the promise should time out,
     *      the default (= 0) is infinite
     *      a negative timeout will cut any bi-directional communication
     * @return promise
     */
    MessageChannel.prototype.postMessage = function (msg, data, timeout) {
        var self = this;

        var msgObj = {
            'id': this._msgNo++,
            'group': this._group,
            'type': 'request',
            'msg': msg,
            'data': data || {}
        };

        // create promise
        var pRes, pRej;

        var p = new Promise(function(resolve, reject) {
            pRes = resolve;
            pRej = reject;
        });

        p.resolve = pRes;
        p.reject = pRej;

        this._messageQueue[msgObj.id] = msgObj;
        this._targetWindow.postMessage(JSON.stringify(msgObj), this._origin);

        // add a promise
        msgObj.promise = p;

        if (timeout) {

            // a negative timeout erases the response option
            if (timeout < 0) {
                this._messageQueue[msgObj.id] = null;
                return;
            }

            setTimeout(function () {
                self._messageQueue[msgObj.id] = null;

                p.reject({
                    error: 'timeout',
                    req: msgObj
                });
            }, timeout);
        }

        return p;
    };

    /**
     * Add configured functionality to another object
     * @param obj target
     */
    MessageChannel.prototype.mixin = function (obj) {
        obj.subscribeRequestMessage = this.subscribeRequestMessage.bind(this);
        obj.unsubscribeRequestMessage = this.unsubscribeRequestMessage.bind(this);
        obj.postMessage = this.postMessage.bind(this);

        return obj;
    };

    /**
     * handler for incoming events
     *
     * @param event
     */
    function receiveMessage(event) {
        var self = this;

        // fix missing location.origin on IE
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }

        // Don't accept messages from other sources!
        // Twitter, for instances, broadcasts __ready__, which throws when trying to JSON.parse it.
        if (event.origin !== location.origin) {
            return;
        }

        var req = event.data;
        if (typeof req === 'string') {
            try {
                req = JSON.parse(req);
            } catch (ex) {
                console.warn('Parsing incoming message failed', req);
                return; // abort on parsing errors
            }
        }

        if (req.group === this._group) {
            // it's a response
            if (req.type === 'response' && this._messageQueue[req.id]) { // just accept cq messages

                this._messageQueue[req.id].promise[
                    req.error ?
                        'reject':
                        'resolve'
                    ]({
                    error: req.error,
                    req: this._messageQueue[req.id],
                    res: req
                }); // req, res

                this._messageQueue[req.id] = null;
            } else if (req.type === 'request') { // it's a request
                var cb = this._requestHandler[req.msg];

                if (cb) {
                    /**
                     * Function to directly respond to a request.
                     * The function call is attached to the request object
                     *
                     * @param msg {String} respond message
                     * @param [data]
                     * @param [error] {String} if error occurs
                     */
                    req.respond = function (msg, data, error) {
                        // answering is limited to 1 time.
                        this.respond = function () {};

                        var msgObj = {
                            'id': this.id,
                            'group': self._group,
                            'type': 'response',
                            'error': error,
                            'msg': msg,
                            'data': data || {}
                        };

                        self._targetWindow.postMessage(JSON.stringify(msgObj), self._origin);
                    };

                    for (var i=0; i < cb.length; i++) {
                        cb[i](req);
                    }
                }
            }
        }

    }

    window.Granite = window.Granite || {};
    window.Granite.author = window.Granite.author || {};
    window.Granite.author.MessageChannel = MessageChannel;

}(this));