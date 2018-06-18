var INTERVAL_IDLE;
var USER_SUBMIT_FORM;

$(document).ready(function() {
	$(window).load(function() { // Run after all other $(document).ready() scripts
		// CODE START
		INTERVAL_IDLE = null;
		USER_SUBMIT_FORM = false;

		removeUserIdLogged();

		var userId;
		// Get userId if exists and simpatico bar is shown. Create one if doesnt exists
		if (localStorage.userData && $("#simp-bar").length > 0) {
			userID = JSON.parse(localStorage.userData).userId;
		} else {
			userId = "no_user_logged_" + new Date().getTime();
			setUserIdNoLogged(userId);
		}

		// Form start
		console.log("[IFE_LOG] FORM Start");
		logCORE.getInstance().ifeLogger.formStart(simpaticoEservice, simpaticoForm);

		// Idle 
		console.log("[IFE_LOG] Create idle interval");
		var INTERVAL_IDLE = setInterval(function(){ sendUserIdle() }, 1000 * 60);  // 1 min

		// Submit form
		$('#btn_presentarElect').on('click', function() { // Dont put .off('click'). There is an another click event inside each service (html file with simpatico) 
			console.log("[IFE_LOG] Form end");
			USER_SUBMIT_FORM = true;
			logCORE.getInstance().ifeLogger.formEnd(simpaticoEservice, simpaticoForm);
			logCORE.getInstance().ifeLogger.sessionEnd(simpaticoEservice);
			console.log("[IFE_LOG] Cleaning idle interval");
			clearInterval(INTERVAL_IDLE);
			INTERVAL_IDLE = null;
		});
	});
});

window.onbeforeunload = function(e) {
	// Clear idle interval
	if (INTERVAL_IDLE) {
		console.log("[IFE_LOG] Cleaning idle interval");
		clearInterval(INTERVAL_IDLE);
	}
	if (!USER_SUBMIT_FORM) {
		console.log("[IFE_LOG] Form Abandoned");
		logCORE.getInstance().ifeLogger.formAbandoned(simpaticoEservice, simpaticoForm);
	}
};


/* FUNCTIONS */
//function isUserLogged() {
//	return localStorage.userData != null && localStorage.userData.length > 0;
//}
function sendUserIdle() {
	console.log("[IFE_LOG] User Idle in form");
	logCORE.getInstance().ifeLogger.formIdle(simpaticoEservice, simpaticoForm);
}
function removeUserIdLogged () {
	localStorage.removeItem('userDataTemp');
}
function getUserIdLogged () {
	if (localStorage.userData) {
		userID = JSON.parse(localStorage.userData).userId;
	} else {
		return "";
	}
}
function setUserIdNoLogged (userID) {
	localStorage.userDataTemp = JSON.stringify({userId: userID});
}
function getUserIdNoLogged () {
	if (localStorage.userDataTemp) {
		return JSON.parse(localStorage.userDataTemp).userId;	
	} else {
		return "";
	}
}
