$(function () {

    // Don't do anything if the az-nav isn't visible
    if (!$('nav#scc_az-topnav').length) {
        return;
    }

    // Check if we have a link hash already?
    var hash = window.location.hash.substr(1);
    if (hash) {
        $('a[href="#' + hash.toLowerCase() + '"]').addClass('scc_selected');
    } else {
        $('.scc_az-links .scc_h2 a').first().addClass('scc_selected');
    }
    update_title($('.scc_main .scc_az-links a.scc_selected').text());

    // Update on clicks
    $('.scc_h2 a').click(function () {
        $('.scc_h2 a').removeClass('scc_selected');
        $(this).addClass('scc_selected');
        update_title($(this).text());
    });

    // Update title
    function update_title(letter) {
        $('.scc_page-intro h1').text(letter);
    }
});

