
// UPM User Interface (upm-ui-popup.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the functionality related to the User Interface
// which enriches the Interactive Front-End component with the features of
// the UPM component.
//-----------------------------------------------------------------------------

var upmUI = (function () {
	var instance; // Singleton Instance of the UI component
	var featureEnabled = false;

	function Singleton() {

		/**
		 * INITIALIZE UPM UI COMPONENT.
		 */
		function initComponent(parameters) {

			console.log("Init UPM UI");

		}

		/**
		 * OPEN CDV UI DIALOG
		 */
		function enableComponentFeatures() {
			console.log("enableComponentFeatures UPM UI");

		}

		function disableComponentFeatures() {
			console.log("disableComponentFeatures UPM UI");

		}


		return {
			// Public definitions
			init: initComponent, // Called only one time
			enable: enableComponentFeatures, // Called when the Component button is enabled
			disable: disableComponentFeatures, // Called when the Component button is disabled or another one enabled
			isEnabled: function () {
				return featureEnabled;
			}, // Returns if the feature is enabled

			//paragraphEvent: paragraphEvent
		};
	}

	return {
		getInstance: function () {
			if (!instance)
				instance = Singleton();
			return instance;
		}
	};
})();