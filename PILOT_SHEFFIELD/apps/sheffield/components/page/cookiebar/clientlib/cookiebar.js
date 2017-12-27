$(function () {

    function setCookie(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
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
	
	function checkCookie() {
		var cookieStatus = getCookie("setCookieStatus");

		$('.scc_cookie-info .scc_button').on('click', function(){
			cookieStatus = "1";
			setCookie("setCookieStatus", cookieStatus, 365);
			$('.scc_cookie-info').slideUp(function(){
				$('.scc_cookie-info').remove();
			});
		});
		
		if (cookieStatus != "1") {
			$('.scc_cookie-info').show();
		} else {
			$('.scc_cookie-info').remove();
		}

	}
	checkCookie();
});

