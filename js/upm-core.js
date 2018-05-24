// Citizen Data Vault Core Client (cdv-core-popup.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the client side of the CDV component
// related to form fill features. The main functionality is to
// create the calls to the server side of the CV instance
// - Used by cdv-ui-popup.js
// - The CDV server side code is available in:
//              https://github.com/SIMPATICOProject/CDV
//-----------------------------------------------------------------------------

var upmCORE = (function () {
	var instance;
	function Singleton() {
		instance = this;

		var endpoint = "http://localhost:8080";
		/**
		 * INIT THE ENGINE CONFIG. PARAMETERS:
		 * - endpoint: URL OF THE CDV API
		 */
		function initComponent(parameters) {

			console.log("upmCore initComponent");
		}




		this.init = initComponent;

	}

	return {
		getInstance: function () {
			if (!instance)
				instance = new Singleton();
			return instance;
		}
	};

})();