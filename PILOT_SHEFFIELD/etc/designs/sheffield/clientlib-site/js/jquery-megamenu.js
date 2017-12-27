$(function () {
    $('.scc_navigation nav > ul').setup_navigation();
});

var keyCodeMap = {
    48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";",
    65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l",
    77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z",
    96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9"
}

$.fn.setup_navigation = function (settings) {

    settings = jQuery.extend({
        megamenuOpenClass: 'scc_megamenu-open',
        selectedAnchorClass: 'scc_megamenu-selected',
    }, settings);

    // Add ARIA role to menubar and menu items

    $(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');

    var top_level_links = $(this).find('> li > a');

    // Set tabIndex to -1 so that top_level_links can't receive focus until menu is open

    $(top_level_links).next('.scc_megamenu')
        .attr('data-test', 'true')
        .attr({'aria-hidden': 'true', 'role': 'menu'})
        .find('a')
        .attr('tabIndex', -1);

    // Adding aria-haspopup for appropriate items

    $(top_level_links).each(function () {
        if ($(this).find('.scc_megamenu ul').length > 0)
            $(this).parent('li').attr('aria-haspopup', 'true');
    });

    // Events

    $(top_level_links).on('click focus', function (e) {
        e.preventDefault();

        $(this).closest('ul')
            .attr('aria-hidden', 'false')
            .find('.' + settings.megamenuOpenClass)
            .attr('aria-hidden', 'true')
            .removeClass(settings.megamenuOpenClass)
            .find('a')
            .attr('tabIndex', -1);
        $(this).closest('ul')
            .find('.' + settings.selectedAnchorClass)
            .removeClass(settings.selectedAnchorClass);

        $(this).next('.scc_megamenu')
            .attr('aria-hidden', 'false')
            .addClass(settings.megamenuOpenClass)
            .find('a').attr('tabIndex', 0);
        $(this).addClass(settings.selectedAnchorClass);

        $('body').addClass('scc_megamenu-bg');

        $('.scc_megamenu p.scc_hide').remove();
        $(this).next('.scc_megamenu').find('> .scc_wrap').prepend('<p class="scc_hide"><a href="#" class="scc_icon-times-after"><span>Close</span></a></p>');
    });

    // Bind arrow keys for navigation

    $(top_level_links).keydown(function (e) {
        if (e.keyCode == 37) {
            e.preventDefault();
            // This is the first item
            if ($(this).parent('li').prev('li').length == 0) {
                $(this).parents('ul').find('> li').last().find('a').first().focus();
            } else {
                $(this).parent('li').prev('li').find('a').first().focus();
            }
        } else if (e.keyCode == 38) {
            e.preventDefault();
            if ($(this).parent('li').find('.scc_megamenu').length > 0) {
                $(this).parent('li').find('.scc_megamenu')
                    .attr('aria-hidden', 'false')
                    .addClass(settings.megamenuOpenClass)
                    .find('a').attr('tabIndex', 0)
                    .last().focus();
            }
        } else if (e.keyCode == 39) {
            e.preventDefault();
            // This is the last item
            if ($(this).parent('li').next('li').length == 0) {
                $(this).parents('ul').find('> li').first().find('a').first().focus();
            } else {
                $(this).parent('li').next('li').find('a').first().focus();
            }
        } else if (e.keyCode == 40) {
            e.preventDefault();
            if ($(this).parent('li').find('.scc_megamenu').length > 0) {
                $(this).parent('li').find('.scc_megamenu')
                    .attr('aria-hidden', 'false')
                    .addClass(settings.megamenuOpenClass)
                    .find('a').attr('tabIndex', 0)
                    .first().focus();
            }
        } else if (e.keyCode == 13 || e.keyCode == 32) {
            // If submenu is hidden, open it
            e.preventDefault();
            $(this).parent('li').find('ul[aria-hidden=true]')
                .attr('aria-hidden', 'false')
                .addClass(settings.megamenuOpenClass)
                .find('a').attr('tabIndex', 0)
                .first().focus();
        } else if (e.keyCode == 27) {
            e.preventDefault();
            $('.' + settings.megamenuOpenClass)
                .attr('aria-hidden', 'true')
                .removeClass(settings.megamenuOpenClass)
                .find('a')
                .attr('tabIndex', -1);
        } else {
            $(this).parent('li').find('.scc_megamenu[aria-hidden=false] ul a').each(function () {
                if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
                    $(this).focus();
                    return false;
                }
            });
        }
    });

    var links = $(top_level_links).parent('li').find('.scc_megamenu').find('a');
    $(links).keydown(function (e) {
        if (e.keyCode == 38) {
            e.preventDefault();
            // This is the first item
            if ($(this).parent('li').prev('li').length == 0) {
                $(this).parents('ul').parents('li').find('a').first().focus();
            } else {
                $(this).parent('li').prev('li').find('a').first().focus();
            }
        } else if (e.keyCode == 40) {
            e.preventDefault();
            if ($(this).parent('li').next('li').length == 0) {
                $(this).parents('ul').parents('li').find('a').first().focus();
            } else {
                $(this).parent('li').next('li').find('a').first().focus();
            }
        } else if (e.keyCode == 27 || e.keyCode == 37) {
            e.preventDefault();
            $(this)
                .parents('ul').first()
                .prev('a').focus()
                .parents('ul').first().find('.' + settings.megamenuOpenClass)
                .attr('aria-hidden', 'true')
                .removeClass(settings.megamenuOpenClass)
                .find('a')
                .attr('tabIndex', -1);
        } else if (e.keyCode == 32) {
            e.preventDefault();
            window.location = $(this).attr('href');
        } else {
            var found = false;
            $(this).parent('li').nextAll('li').find('a').each(function () {
                if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
                    $(this).focus();
                    found = true;
                    return false;
                }
            });

            if (!found) {
                $(this).parent('li').prevAll('li').find('a').each(function () {
                    if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
                        $(this).focus();
                        return false;
                    }
                });
            }
        }
    });

    // Hide menu if click or focus occurs outside of navigation
    $(this).find('a').last().keydown(function (e) {
        if (e.keyCode == 9) {
            // If the user tabs out of the navigation hide all menus
            closeMegamenu();
        }
    });

    // close megamenu on desktop
    $(document).on('click touchstart', function () {
        closeMegamenu();
    });

    // close megamenu on mobile
    $('.scc_megamenu').on('click', 'p.scc_hide a', function (e) {
        e.preventDefault();
        closeMegamenu();
    });

    $(this).on('click touchstart', function (e) {
        e.stopPropagation();
    });

    var closeMegamenu = function () {
        $('.' + settings.megamenuOpenClass).attr('aria-hidden', 'true').removeClass(settings.megamenuOpenClass).find('a').attr('tabIndex', -1);
        $('a.' + settings.selectedAnchorClass).removeClass(settings.selectedAnchorClass);
        $('body').removeClass('scc_megamenu-bg');
    }
};