
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
			$.getJSON( "../js/languages."+language+".json", function( languages ) {
				languagesJson = languages;
				$.getJSON( "../js/countries."+language+".json", function( countries ) {
					countriesJson = countries;
					showUPMForm(language, languagesJson, countriesJson);
				});
				
			  });


		}

		function disableComponentFeatures() {
			console.log("disableComponentFeatures UPM UI");

		}

		function showUPMForm(language, languagesJson, countriesJson)
		{
			console.log("showUPMForm" + language);
			console.log(countriesJson);
			//Aquí va la creación del formulario. Campos:
			// userID
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

			var formBox = document.createElement('div');
			formBox.id = "upm-box";
			var formBoxHTML = '<form id="upmform">';
				formBoxHTML += '<div class="form-group">';
					formBoxHTML += '<label for="upmage">Age</label>';
					formBoxHTML += '<input type="number" class="form-control" id="upmage" placeholder="40">';
					formBoxHTML += '<label for="exampleFormControlSelect1">Country of birth</label>';
					formBoxHTML += '<select class="form-control" id="upmcountry">';
					$.each( countriesJson, function(key, val) {
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});
					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">Languages spoken</label>';
					formBoxHTML += '<select multiple class="form-control" id="upmlanguages">';
			
					$.each( languagesJson, function(key, val) {
						formBoxHTML += '<option value="'+key+'">'+val+'</option>';
					});

					formBoxHTML += '</select>';

					formBoxHTML += '<label for="exampleFormControlSelect1">Proficiency in the main language</label>';
					formBoxHTML += '<select class="form-control" id="exampleFormControlSelect1">';
						formBoxHTML += '<option>A1</option>';
						formBoxHTML += '<option>A2</option>';
						formBoxHTML += '<option>B1</option>';
						formBoxHTML += '<option>B2</option>';
						formBoxHTML += '<option>C1</option>';
						formBoxHTML += '<option>C2</option>';
					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">Disability</label>';
					formBoxHTML += '<select class="form-control" id="exampleFormControlSelect1">';
						formBoxHTML += '<option>Physical</option>';
						formBoxHTML += '<option>Visual</option>';
						formBoxHTML += '<option>Hearing</option>';
						formBoxHTML += '<option>Mental</option>';
						formBoxHTML += '<option>Intellectual</option>';
						formBoxHTML += '<option>Learning</option>';
					formBoxHTML += '</select>';
					formBoxHTML += '<label for="exampleFormControlSelect1">Familiarity with PA service</label>';
					formBoxHTML += '<select class="form-control" id="exampleFormControlSelect1">';
					formBoxHTML += '<option>Basic</option>';
					formBoxHTML += '<option>Intermediate</option>';
					formBoxHTML += '<option>Advanced</option>';
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