/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2014 Adobe Systems Incorporated
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
;(function (window, undefined) {

    window.Granite = window.Granite || {};
    window.Granite.author = window.Granite.author || {};

    function getDpi() {
        var body = document.body,
            elem = document.createElement('div');

        body.appendChild(elem);

        elem.style.width = '1in';

        var val = document.defaultView
            .getComputedStyle(elem, null)
            .getPropertyValue('width');

        body.removeChild(elem);

        return parseFloat(val);
    }

    function detectNativeDevice() {
        var cfg = {
            'type': 'screen',
            'width': window.innerWidth || document.documentElement.clientWidth,
            'height': window.innerHeight || document.documentElement.clientHeight,

            'device-width': window.screen.width,
            'device-height': window.screen.height,
            'device-pixel-ratio': 1.0,

            'resolution': getDpi(),
            'scan': 'progressive',
            'grid': false,

            'color': window.screen.colorDepth,
            'color-index': window.screen.pixelDepth,
            'monochrome': 0
        };

        cfg['aspect-ratio'] = cfg.width / cfg.height;
        cfg['orientation'] = cfg.width > cfg.height ? 'landscape' : 'portrait';
        cfg['device-aspect-ratio'] = cfg['device-width'] / cfg['device-height'];

        return cfg;
    }

    function createStyleSheet(document) {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style;
    }

    /**
     * The asset finder is a registry for a certain interface
     * @type {*}
     */
    var MediaEmulator = function(doc) {
        this.document = doc;

        this._getRules();
    };

    /**
     * returns the native device and window configuration
     * @type {detectNativeDevice}
     */
    MediaEmulator.getNativeDevice = detectNativeDevice;

    MediaEmulator.prototype = {};

    /**
     * @type appliedStyleSheet {HTMLStyleElement} which contains the styles for the currently applied device
     */
    Object.defineProperty(MediaEmulator.prototype, 'appliedStyleSheet', {
        get: function () {
            var detached = true, pn = this._appliedStyleSheet;

            while (pn && (pn = pn.parentNode)) {
                if (pn === this.document) {
                    detached = false;
                    break;
                }
            }

            if (!this._appliedStyleSheet || detached) {
                this._appliedStyleSheet = createStyleSheet(this.document);
            }

            return this._appliedStyleSheet;
        }
    });

    /**
     * gets the rules from the document
     * @private
     */
    MediaEmulator.prototype._getRules = function () {
        var rules = [], cachedRules = MediaEmulator.parser.getMediaRules(this.document),
            rule, i, j, cssRules;


        for (i=0; i < cachedRules.length; i++) {
            cssRules = [];

            rule = MediaEmulator.parser.parseMediaRule(cachedRules[i].media.mediaText);

            for (j=0; j < cachedRules[i].cssRules.length; j++) {
                cssRules.push(cachedRules[i].cssRules[j].cssText); // workaround: in FF (seen in v32) cssText is empty if the original rule is not in place
            }

            rules.push({
                mediaText: cachedRules[i].media.mediaText,
                cssRules: cssRules,
                parsed: rule,
                mediaRule: cachedRules[i]
            });
        }

        this.rules = rules;
    };

    /**
     * deletes all media bound rules from the document
     * This will remove the responsiveness from the document
     */
    MediaEmulator.prototype.removeMediaRules = function () {
        for (var i=0; i < this.rules.length; i++) {
            while (this.rules[i].mediaRule.cssRules[0]) {
                this.rules[i].mediaRule.deleteRule(0);
            }
        }
    };

    /**
     * deletes set rules for a device
     * This removes the force device configuration
     */
    MediaEmulator.prototype.clear = function () {
        document.head.removeChild(this.appliedStyleSheet);
        this.appliedStyleSheet = null;
    };

    /**
     * Will restore the natural css state of the document
     */
    MediaEmulator.prototype.restore = function () {
        var rule, i, j;

        // delete custom style sheet
        document.head.removeChild(this.appliedStyleSheet);
        this.appliedStyleSheet = null;

        for (i=0; i < this.rules.length; i++) {
            try {
                rule = this.rules[i];

                for (j=0; j < rule.cssRules.length; j++) {
                    rule.mediaRule.insertRule(rule.cssRules[j], rule.mediaRule.cssRules.length);
                }
            } catch (ex) {
                // we ignore errors for external sheets we can't read
            }

        }
    };

    /**
     * forces a specific device configuration
     * which means it will filter the matching media queries and applies them
     * @param device
     */
    MediaEmulator.prototype.applyDevice = function (device) {
        var rule, i, j;

        this.clear();
        this.removeMediaRules();

        // apply width to html and body
        this.appliedStyleSheet.sheet.insertRule('html, body { width: '+ device.width +'px; }', 0);


        for (i=0; i < this.rules.length; i++) {
            try {
                rule = this.rules[i];
                if (MediaEmulator.parser.matchDevice(rule.parsed, device)) {

                    for (j=0; j < rule.cssRules.length; j++) {
                        this.appliedStyleSheet.sheet.insertRule(rule.cssRules[j], this.appliedStyleSheet.sheet.cssRules.length);
                    }
                }
            } catch (ex) {
                // we ignore errors for external sheets we can't read
            }
        }
    };

    /**
     * Calculates all missing properties of a device
     * @param device
     */
    MediaEmulator.prototype.prepareDevice = function (device) {
        var res = {
            'type': device.type || 'screen',
            'device-pixel-ratio': device['device-pixel-ratio'] || 1.0,
            'resolution': device.resolution || 96,
            'scan': device.scan || 'progressive',
            'grid': !!device.grid,

            'color': device.color || 8,
            'color-index': device['color-index'] || 0,
            'monochrome': device.monochrome || 0
        };

        res['width'] = Math.floor(device.width / res['device-pixel-ratio']);
        res['height'] = Math.floor(device.height / res['device-pixel-ratio']);
        res['device-width'] = device['device-width'] || res.width;
        res['device-height'] = device['device-height'] || res.height;

        res['aspect-ratio'] = device['aspect-ratio'] || (device.width / device.height);
        res['orientation'] = device['orientation'] || (device.width > device.height ? 'landscape' : 'portrait');
        res['device-aspect-ratio'] = device['device-aspect-ratio'] || (device['device-width'] / device['device-height']);

        return res;
    };

    window.Granite.author.MediaEmulator = MediaEmulator;

}(this));
