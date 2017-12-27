/*******************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 * Copyright 2015 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 ******************************************************************************/

(function () {
    var guideBridge, aemFormConfig,
        onSubmit = function (guideResultObj) {
            var data, element, iframeDocument;
            if (aemFormConfig.thankyouConfig == "page") {
                data = guideResultObj.data;
                $(".aemformcontainer").empty().html(data);
            } else {
                if (aemFormConfig.useIframe !== "false") {
                    iframeDocument = $("#aemFormFrame")[0].contentWindow.document;
                    element = iframeDocument.createElement("div");
                } else {
                    element = $(".aemformcontainer")[0];
                }
                element.innerHTML = aemFormConfig.thankyouMessage;
                element.style.textAlign = "center";
                element.style.marginTop = "20px";
                element.setAttribute("data-iframe-height", "");
                iframeDocument.body.innerHTML = "";
                iframeDocument.body.appendChild(element);
            }
        },
        updateForm = function (guideBridge) {
            if (aemFormConfig.useIframe !== "false" && aemFormConfig.height == "auto") {
                iFrameResize({
                    autoResize : true,
                    scrolling: true,
                    heightCalculationMethod : "taggedElement"
                }, "#aemFormFrame");
            }
            if (aemFormConfig.height != "auto") {
                $("#aemFormFrame").css("height", aemFormConfig.height);
            }
            var submitConfig = {},
                formElement;
            if (aemFormConfig.thankyouConfig == "page") {
                submitConfig.thankyouPage = aemFormConfig.thankyouPage === "" ? null : aemFormConfig.thankyouPage;
            }
            if (aemFormConfig.thankyouConfig === "message" ||
                (aemFormConfig.useIframe === "false" && aemFormConfig.submitType === "inline")) {
                submitConfig.useAjax = true;
                submitConfig.submitSuccessHandler = onSubmit;
            } else {
                if (aemFormConfig.submitType === "pageRefresh" && aemFormConfig.useIframe !== "false") {
                    formElement = document.createElement("form");
                    formElement.setAttribute("method", "POST");
                    formElement.setAttribute("enctype", "multipart/form-data");
                    document.body.appendChild(formElement);
                    submitConfig.form = formElement;
                }
            }
            guideBridge.registerConfig("submitConfig", submitConfig);
        },
        initAEMForm = function (evnt) {
            guideBridge = evnt.detail.guideBridge;
            updateForm(guideBridge);
            window.removeEventListener("bridgeInitializeStart", initAEMForm);
        },
        connectWithGuideBridge = function () {
            if (window.guideBridge) {
                guideBridge = window.guideBridge;
                updateForm(guideBridge);
            } else {
                window.addEventListener("bridgeInitializeStart", initAEMForm);
            }
        },
        initializeAEMForm = function (config) {
            aemFormConfig = config;
            if (config.form == "true") {
                connectWithGuideBridge();
            }
        },
        tmpEvent = document.createEvent("CustomEvent");

    tmpEvent.initCustomEvent("aemform-onscript-load", true, true, {
        formApp : {
            initializeAEMForm : initializeAEMForm
        }
    });
    window.dispatchEvent(tmpEvent);
}());