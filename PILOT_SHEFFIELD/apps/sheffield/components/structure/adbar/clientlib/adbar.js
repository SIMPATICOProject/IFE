$(function () {
    var adbar = $('.scc_adbar'),
        adbarHeight = adbar.height(),
        expire_time = adbar.data('expire-time') || 1;

    if (adbar.is(':visible')) {
        $('.scc_top-jump').css('bottom', adbarHeight);
        $('.scc_footer').css('paddingBottom', adbarHeight);
    }

    function setCookie(cname, cvalue, expire_in) {
        var time = new Date();
        var now = time.getTime();
        var expire = now + expire_in;
        time.setTime(expire);

        document.cookie = cname + "=" + cvalue + ";expires=" + time.toGMTString() + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function adbarCookie() {
        var cookieStatus = getCookie("adbarCookie");
        $('.scc_adbar .scc_button').on('click', function (e) {
            e.preventDefault();
            cookieStatus = "1";
            setCookie("adbarCookie", cookieStatus, expire_time * 60000);
            adbar.slideUp(function () {
                adbar.fadeOut(function () {
                    $(this).remove();
                });
                $('.scc_footer').css('paddingBottom', '2rem');
                $('.scc_top-jump').css('bottom', '0');
            });
        });

        if (cookieStatus != "") {
            adbar.remove();
            $('.scc_footer').css('paddingBottom', '2rem');
            $('.scc_top-jump').css('bottom', '0');
        }
    }

    adbarCookie();

});