(function ($) {
    $('a[data-cta-show-alert="true"]').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.prop('href'),
            heading = $this.data('cta-alert-heading'),
            message = $this.data('cta-alert-message'),
            timeout = $this.data('cta-alert-timeout');

        SCC.show_external_navigation_message(href, heading, message, timeout);
    });


}(jQuery));