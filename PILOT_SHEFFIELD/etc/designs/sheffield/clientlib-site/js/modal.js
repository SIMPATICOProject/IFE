'use strict';

var SCC = SCC || {};

SCC.hide_modal = function () {
    SCC.$modal.removeClass('visible');
};

SCC.show_modal = function () {
    SCC.$modal.addClass('visible');
};

SCC.show_external_navigation_message = function (href, title, message, timeout) {
    var timeout_id;

    $('.scc_modal_message', SCC.$modal).text(message);
    $('.scc_modal_title', SCC.$modal).text(title);

    $('.scc_button.scc_button_redirect', SCC.$modal).one('click', function (e) {
        e.preventDefault();

        timeout_id && clearTimeout(timeout_id);
        window.open(href);
        SCC.hide_modal();
    });

    $('.scc_button.scc_button_stay').one('click', function (e) {
        e.preventDefault();

        timeout_id && clearTimeout(timeout_id);
        SCC.hide_modal();
    });

    //redirects the user
    timeout_id = window.setTimeout(function () {
        timeout_id && clearTimeout(timeout_id);
        window.location.href = href;
    }, timeout * 1000);

    SCC.show_modal();
};

SCC.bind_external_link_handler = function () {
    $("#scc_main-content a ,#scc_top a ,.scc_navigation a").each(function () {
        if (SCC.is_external_link(this)) {
            $(this).addClass('scc_icon-new-window-after');
        }
    });
};

$(document).ready(function () {
    SCC.$modal = $('#scc_modal');
    SCC.bind_external_link_handler();
});