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
;(function (window, undefined) {
    'use strict';

    function reposition() {
        /**
         * Triggered when the layout of the iframe #ContentFrame has changed
         *
         * It's critical to throttle or debounce this message as it will be call on resize events as well
         *
         * @postMessage cq-contentframe-layout-change
         */
        Granite.author.inner.EditorFrame.postMessage('cq-contentframe-layout-change', null, -1);
    }

    var observer = new MutationObserver(reposition);

    document.addEventListener('DOMContentLoaded', function(ev) {
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true  // To catch style changes on child elements too
        });

        document.addEventListener('load', reposition, true);
        window.addEventListener('resize', reposition, true);
    });

}(this));