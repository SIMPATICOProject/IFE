
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
		 * OPEN UPM UI DIALOG
		 */
		function enableComponentFeatures(language) {
			console.log("enableComponentFeatures UPM UI");
			showUPMForm(language);

		}

		function disableComponentFeatures() {
			console.log("disableComponentFeatures UPM UI");

		}

		function showUPMForm(language)
		{
			console.log("showUPMForm" + language);
			//Aquí va la creación del formulario. Campos:
			// 			userID
			// age
			// country of birth - UPM expects a country from a predefined list:
			// English database: https://drive.google.com/open?id=1b1S_hrfJ16oyYjB8VuccKW3vPg85JlY7
			// Spanish database: https://drive.google.com/open?id=1HZo2ghKm4O4khjuxNLM403oQ0s8EeqOS OK
			// Italian database: https://drive.google.com/open?id=1Kal1xDMPbkrmbEe0dmh-Ux0QKWskXSrM
			// languages spoken (UPM databases can receive more than one language) - also from a predefined  list:
			// English database: https://drive.google.com/open?id=15K_TRUarewUYVgT4y1CbnKqcryiVJucO
			// Spanish database: https://drive.google.com/open?id=1wEUGsrnk123sbAk9c2QqES_SfId2QpBN OK
			// Italian database: https://drive.google.com/open?id=1no0Uj7yzB1PMQxvGdVOKMTqOR4buwrMh
			// proficiency in the main language (CEFR framework): A1, A2, B1, B2, C1, C2
			// educational level - predefined list:
			// English: primary, secondary, undergration, post-graduation
			// Spanish: primaria, secundaria, universitaria, postgraduado
			// Italian: licenza elementare, licenza media, diploma, laurea, master/dottorato
			// disability - predefined list:
			// English: physical, visual, hearing, mental, intellectual, learning
			// Spanish: física, visual, auditiva, psíquica, intelectual, de aprendizaje
			// Italian: fisica, visiva, uditiva, mentale, intellettiva, di apprendimento
			// familiarity with PA service  - predefined list:
			// English: basic, intermediate, advanced 
			// Spanish: basic, intermediate, advanced
			// Italian: base, intermedia, avanzata
			// occupation



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