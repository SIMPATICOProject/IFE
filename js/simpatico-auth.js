// Auth functionality
// The AAC server has to be installed
// https://github.com/SIMPATICOProject/aac

// attach login flow to the sign-in button

function handleAuthClick() {
    var aacBase = 'https://simpatico.morelab.deusto.es/aac';
    var base = window.location.href;
    var arr = base.split("/");
    var redirect = arr[0]+'//'+arr[2]+'/IFE/login.html';
    var authority = 'google';


  var url = aacBase + '/eauth/authorize/'+authority+'?response_type=token&'
  + 'redirect_uri='+redirect+'&client_id=5fc30d3c-ba72-411a-9ecb-7f4546a2af6a'; //Client id from the AAC console
      var win = window.open(url, 'AuthPopup', 'width=1024,height=768,resizable=true,scrollbars=true,status=true');
      window.addEventListener('message', function (event) {
        jQuery.ajax({
              url: aacBase + '/basicprofile/me',
              type: 'GET',
              dataType: 'json',
              success: function(data) {
                localStorage.userData = JSON.stringify(data);
            initUserData();
              },
              error: function(err) {
                console.log(err);
              },
              beforeSend: function(xhr) {
                  xhr.setRequestHeader('Authorization', 'Bearer ' + event.data.access_token);
              }
            });
        localStorage.aacTokenData = JSON.stringify(event.data);

      }, false);

}

function handleSignoutClick(event) {

  // var logOutURL = 'https://simpatico.morelab.deusto.es/aac/logout';
  // jQuery.get( logOutURL, function( data ) {
  //   console.log("Logout");
  // });
  localStorage.userData = '';
  initUserData();
}

function initUserData () {
		var data = JSON.parse(localStorage.userData || 'null');
		if (!!data) {
			userData = data;
      document.getElementById('userdata').innerHTML = 'Hello, ' + data.name + ' '+ data.surname;
      document.getElementById('userdata').style = "display:block";
      document.getElementById('loginimg').src = "img/ic_on.png";
      document.getElementById('loginSwitch').setAttribute("onclick", "handleSignoutClick()");
      showButtons();
		} else {
      document.getElementById('loginimg').src = "img/login.png";
      document.getElementById('loginSwitch').setAttribute("onclick", "switchFunction('login');");
      document.getElementById('userdata').innerHTML = "";
      hideButtons();
		}

}
