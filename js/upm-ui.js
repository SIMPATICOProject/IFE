
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
		function enableComponentFeatures(language, languagesJson) {
			console.log("enableComponentFeatures UPM UI");

			var languagesJson;
			var countriesJson;
			$.getJSON( "../js/upm."+language+".json", function( data ) {
				showUPMForm(data);
			  });


		}

		function disableComponentFeatures() {
			console.log("disableComponentFeatures UPM UI");

		}

		function showUPMForm(data)
		{
			var formBox = document.createElement('div');
			formBox.id = "upm-box";
			var formBoxHTML = '<form id="upmform">';
				formBoxHTML += '<div class="form-group">';
					formBoxHTML += '<label for="upmage">'+data.ui_strings.age+'</label>';
					formBoxHTML += '<input type="number" class="form-control" id="upmage" placeholder="40">';
					formBoxHTML += '<label for="exampleFormControlSelect1">'+data.ui_strings.country+'</label>';
					formBoxHTML += '<select class="form-control" id="upmcountry">';
					$.each( data.countries, function(key, val) {
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});
					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">'+data.ui_strings.languages+'</label>';
					formBoxHTML += '<select multiple class="form-control" id="upmlanguages">';
			
					$.each( data.languages, function(key, val) {
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});

					formBoxHTML += '</select>';

					formBoxHTML += '<label for="exampleFormControlSelect1">'+data.ui_strings.proficiency+'</label>';
					formBoxHTML += '<select class="form-control" id="upmproficiency">';
					$.each( data.language_proficiency, function(key, val) {
						console.log(val);
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});

					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">Educational level</label>';
					formBoxHTML += '<select class="form-control" id="upmeducationallevel">';
					$.each( data.educational_level, function(key, val) {
						console.log(val);
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});

					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">Disability</label>';
					formBoxHTML += '<select class="form-control" id="upmdisability">';
					$.each( data.disability, function(key, val) {
						console.log(val);
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});
					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">Familiarity with PA service</label>';
					formBoxHTML += '<select class="form-control" id="upmfamiliarity">';
					$.each( data.familiarity, function(key, val) {
						console.log(val);
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});
					formBoxHTML += '</select>';
					formBoxHTML += '<label for="upmage">Occupation</label>';
					formBoxHTML += '<input type="string" class="form-control" id="upmoccupation" placeholder="Retired	">';
				formBoxHTML += '</div>';
			formBoxHTML += '</form>';

			formBox.innerHTML = formBoxHTML;

			document.getElementById('simpatico_top').appendChild(formBox);

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