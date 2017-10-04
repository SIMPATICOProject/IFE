// Citizen Data Vault Core Client (cdv-core-popup.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the client side of the CDV component
// related to form fill features. The main functionality is to
// create the calls to the server side of the CV instance
// - Used by cdv-ui-popup.js
// - The CDV server side code is available in:
//              https://github.com/SIMPATICOProject/CDV
//-----------------------------------------------------------------------------

var cdvCORE = (function () {
	var instance;
	function Singleton() {

		var endpoint = "http://localhost:8080";
		var serviceID = 2;
		var serviceURL = "http://localhost:8080/service2";
		var dataFields = [];
		var serviceLink = '';
		var username = '';
		var cdvDashUrl='#'

		/**
		 * INIT THE ENGINE CONFIG. PARAMETERS:
		 * - endpoint: URL OF THE CDV API
		 */
		function initComponent(parameters) {

			if (parameters.endpoint) {
				endpoint = parameters.endpoint;
			}
			if (parameters.serviceID) {
				serviceID = parameters.serviceID;
			}
			if (parameters.serviceURL) {
				serviceURL = parameters.serviceURL;
			}
			if (parameters.dataFields) {
				dataFields = parameters.dataFields;
			}
			if (parameters.cdvDashUrl) {
				cdvDashUrl = parameters.cdvDashUrl;
			}
		}

		this.cdv_getdata = function (updatePDataFields, errorCallback) {
			var properties = {};
			console.log("SERVICEID:" + serviceID);
			var userData = JSON.parse(localStorage.userData || 'null');
			console.log("USERDATA:" + JSON.parse(localStorage.userData || 'null'));

			var url = endpoint + "/pdata-manager/api/v1/getPData";
			var data = JSON.parse(localStorage.userData || 'null');
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);
			var pdata = new PData(data.userId, serviceLink);
			$.ajax({
				url: url,
				type: 'POST',
				data: pdata.toJsonString(),
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				success: (function (json) {
					console.log(JSON.stringify(json));
					updatePDataFields(json);

				}),
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ", " + err);
					errorCallback("Errore nella comunicazione col server");
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);

				}

			});
		}

		this.cdv_postdata = function (callback) {

			var data = JSON.parse(localStorage.userData || 'null');
			var url = endpoint + "/pdata-manager/api/v1/postPData?mode=append";
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);
			var pdata = formFieldsToJSON(serviceLink, data.userId, dataFields);

			$.ajax({
				url: url,
				type: 'POST',
				data: pdata,
				contentType: "application/json; charset=utf-8",
				success: function (resp) {
					console.log("pdata saved!");
					callback(true);

				},
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ", " + err);
					callback(false);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);

				}

			});

		}

		this.cdv_getSLink = function (callback) {

			var data = JSON.parse(localStorage.userData || 'null');
			var url = endpoint + "/account-manager/api/v1/users/" + data.userId + "/services/" + serviceID + "/serviceLink";
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);
			var pdata = formFieldsToJSON(serviceLink, data.userId, dataFields);

			$.ajax({
				url: url,
				type: 'GET',
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				success: function (json) {
					console.log(json._id);
					serviceLink = json._id;
					callback(true, true);

				},
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ", " + err);
					callback(true, false);

				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);

				}

			});

		}

		this.cdv_getAccount = function (callback) {

			var data = JSON.parse(localStorage.userData || 'null');
			var url = endpoint + "/account-manager/api/v1/users/" + data.userId + "/serviceLink";
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);
			var pdata = formFieldsToJSON(serviceLink, data.userId, dataFields);

			$.ajax({
				url: url,
				type: 'GET',
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				success: function (json) {
					console.log(json.username);
					username = json.username;
					callback(true);

				},
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ", " + err);
					callback(false);

				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);

				}

			});

		}

		this.cdv_createAccount = function (callback) {

			var data = JSON.parse(localStorage.userData || 'null');
			var url = endpoint + "/account-manager/api/v1/accounts";
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);
			var account = accountToJSON(data.userId, data.name, data.surname);

			$.ajax({
				url: url,
				type: 'POST',
				data: account,
				contentType: "application/json; charset=utf-8",
				success: function (resp) {
					console.log("account created");
					username = resp.username;
					callback(true);

				},
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ", " + err);
					callback(false);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);

				}

			});

		}

		this.cdv_createSLR = function (callback) {

			var data = JSON.parse(localStorage.userData || 'null');
			var url = endpoint + "/account-manager/api/v1/accounts/" + username + "/serviceLinks";
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);
			var slr = slrToJSON(data.userId, serviceID, serviceURL);

			$.ajax({
				url: url,
				type: 'POST',
				data: slr,
				contentType: "application/json; charset=utf-8",
				success: function (resp) {
					console.log("slr saved!");
					serviceLink = resp._id;
					callback(true, true);

				},
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ", " + err);
					callback(false, false);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);

				}

			});

		}

		this.cdv_exportData = function () {

            var dataUser = JSON.parse(localStorage.userData || 'null');
			var name = dataUser.name;
			var surname = dataUser.surname;

			console.log(name);
			console.log(surname);

			var fullName = name + " " + surname; 

			if (simpaticoEservice == "BS613B") {
				$.get('../js/usuarios_prueba_BS613B.json', function (data) {
					// Fill fields with data from json

					// Data es un ARRAY de usuarios
					// TODO: Bucle para buscar al usuario con name + " " + surname == data[i]["FIELD3"] + " " + data[i][FIELD4] + " " + data[i]["FIELD5"]

					data.forEach(function(current, index, array) {
					    console.log(current);

					    var nameJSON = current["FIELD3"];
					    nameJSON = nameJSON.replace(/á/gi,"");
						nameJSON = nameJSON.replace(/é/gi,"");
						nameJSON = nameJSON.replace(/í/gi,"");
						nameJSON = nameJSON.replace(/ó/gi,"");
						nameJSON = nameJSON.replace(/ú/gi,"");
						nameJSON = nameJSON.replace(/ñ/gi,"");

						var firstSurnameJSON = current["FIELD4"];
						firstSurnameJSON = firstSurnameJSON.replace(/á/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/é/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/í/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/ó/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/ú/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/ñ/gi,"");

						var secondSurnameJSON = current["FIELD5"];
						secondSurnameJSON = secondSurnameJSON.replace(/á/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/é/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/í/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/ó/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/ú/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/ñ/gi,"");

	                                    
					    if (fullName.toLowerCase() == nameJSON.toLowerCase() + " " + firstSurnameJSON.toLowerCase() + " " + secondSurnameJSON.toLowerCase()) {
							$("#BS613B\\.Entidad\\.txtNombre").val(current["FIELD3"]);
							$("#BS613B\\.Entidad\\.txtApel1").val(current["FIELD4"]);
							$("#BS613B\\.Entidad\\.txtApel2").val(current["FIELD5"]);
							$("#BS613B\\.Entidad\\.txtNifCif").val(current["FIELD6"]);


							$("#BS613B\\.Entidad\\.txtDireccion").val(current["FIELD8"]);
							$("#BS613B\\.Entidad\\.txtNumero").val(current["FIELD9"]);
							$("#BS613B\\.Entidad\\.txtPiso").val(current["FIELD10"]);
							$("#BS613B\\.Entidad\\.txtPuerta").val(current["FIELD11"]);
							$("#BS613B\\.Entidad\\.txtLugar").val(current["FIELD12"]);
							$("#BS613B\\.Entidad\\.txtLugar").val(current["FIELD12"]);
							$("#BS613B\\.Entidad\\.txtCodigoPostal").val(current["FIELD6"]); // No viene
							$("#BS613B\\.Entidad\\.txtLocalidad").val(current["FIELD32"]);
							$("#BS613B\\.Entidad\\.txtTelefono").val(current["FIELD13"]);
							$("#BS613B\\.Entidad\\.txtMovil").val(current["FIELD13"]); // Igual que teléfono
							$("#BS613B\\.Entidad\\.txtEmail").val(current["FIELD14"]);

							$("#BS613B\\.Cuenta\\.txtTitular").val(current["FIELD15"]);
							var iban = current["FIELD16"];
							var ibanSplit = iban.split(" ");
							$("#BS613B\\.Cuenta\\.txtIBAN1").val(ibanSplit[0]);
							$("#BS613B\\.Cuenta\\.txtIBAN2").val(ibanSplit[1]);
							$("#BS613B\\.Cuenta\\.txtIBAN3").val(ibanSplit[2]);
							$("#BS613B\\.Cuenta\\.txtIBAN4").val(ibanSplit[3]);
							$("#BS613B\\.Cuenta\\.txtIBAN5").val(ibanSplit[4]);
							$("#BS613B\\.Cuenta\\.txtIBAN6").val(ibanSplit[5]);

							if (current["FIELD17"].indexOf("010110") > 0) {
								$("#BS613B\\.TipoServicio\\.13").prop("checked", true);
							} else {  // Es lo mismo, pero el id no concuerda
								$("#BS613B\\.TipoServicio\\.13").prop("checked", true);
							}

							$("#BS613B\\.Discapacidad\\.Si").prop("checked", true);
							$("#BS613B\\.Discapacidad\\.txtGrado").val(current["FIELD19"]);
							$("#BS613B\\.Discapacidad\\.txtExpediente").val(current["FIELD20"]);

							$("#BS613B\\.Dependencia\\.No").prop("checked", true);

							$("#optAuth1_Si").prop("checked", true);
							$("#optAuth2_Si").prop("checked", true);
							$("#optAuth3_Si").prop("checked", true);
							$("#optAuth4_Si").prop("checked", true);
							$("#optAuth5_Si").prop("checked", true);
							$("#optAuth6_Si").prop("checked", true);

					    } else {
					    	console.log("No match");
					    	console.log(fullName);
					    	console.log(current["FIELD3"] + " " + current["FIELD4"] + " " + current["FIELD5"])
					    }
					});
				});
			} else {
				$.get('../js/usuarios_prueba_BS607A.json', function (data) {
					// Fill fields with data from json

					// Data es un ARRAY de usuarios
					// TODO: Bucle para buscar al usuario con name + " " + surname == data[i]["FIELD3"] + " " + data[i][FIELD4] + " " + data[i]["FIELD5"]

					data.forEach(function(current, index, array) {
					    console.log(current);

					    var nameJSON = current["FIELD3"];
					    nameJSON = nameJSON.replace(/á/gi,"");
						nameJSON = nameJSON.replace(/é/gi,"");
						nameJSON = nameJSON.replace(/í/gi,"");
						nameJSON = nameJSON.replace(/ó/gi,"");
						nameJSON = nameJSON.replace(/ú/gi,"");
						nameJSON = nameJSON.replace(/ñ/gi,"");

						var firstSurnameJSON = current["FIELD4"];
						firstSurnameJSON = firstSurnameJSON.replace(/á/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/é/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/í/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/ó/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/ú/gi,"");
						firstSurnameJSON = firstSurnameJSON.replace(/ñ/gi,"");

						var secondSurnameJSON = current["FIELD5"];
						secondSurnameJSON = secondSurnameJSON.replace(/á/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/é/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/í/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/ó/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/ú/gi,"");
						secondSurnameJSON = secondSurnameJSON.replace(/ñ/gi,"");

	                                    
					    if (fullName.toLowerCase() == nameJSON.toLowerCase() + " " + firstSurnameJSON.toLowerCase() + " " + secondSurnameJSON.toLowerCase()) {
					    	$("#BS607A\\.Entidad\\.txtNombre").val(current["FIELD3"]);
							$("#BS607A\\.Entidad\\.txtApel1").val(current["FIELD4"]);
							$("#BS607A\\.Entidad\\.txtApel2").val(current["FIELD5"]);
							$("#BS607A\\.Entidad\\.txtNifCif").val(current["FIELD6"]);


							$("#BS607A\\.Entidad\\.txtDireccion").val(current["FIELD8"]);
							$("#BS607A\\.Entidad\\.txtNumero").val(current["FIELD9"]);
							$("#BS607A\\.Entidad\\.txtPiso").val(current["FIELD10"]);
							$("#BS607A\\.Entidad\\.txtPuerta").val(current["FIELD11"]);
							$("#BS607A\\.Entidad\\.txtLugar").val(current["FIELD12"]);
							$("#BS607A\\.Entidad\\.txtCodigoPostal").val(current["FIELD6"]); // No viene
							$("#BS607A\\.Entidad\\.txtLocalidad").val(current["FIELD32"]);
							$("#BS607A\\.Entidad\\.txtTelefono").val(current["FIELD13"]);
							$("#BS607A\\.Entidad\\.txtMovil").val(current["FIELD13"]); // Igual que teléfono
							$("#BS607A\\.Entidad\\.txtEmail").val(current["FIELD14"]);

							$("#BS607A\\.HijoDiscap\\.txtNombre").val(current["FIELD15"]);
							$("#BS607A\\.HijoDiscap\\.txtApel1").val(current["FIELD16"]);
							$("#BS607A\\.HijoDiscap\\.txtApel2").val(current["FIELD17"]);
							$("#BS607A\\.HijoDiscap\\.txtNifCif").val(current["FIELD18"]);

							$("#BS607A\\.HijoDiscap\\.txtFechaNac").val(current["FIELD20"]);
							$("#BS607A\\.HijoDiscap\\.txtNCartillaSanit").val(current["FIELD21"]);
							$("#BS607A\\.HijoDiscap\\.txtPorcentDiscap").val(current["FIELD22"]);

							$("#BS607A\\.PersonaContact\\.txtNombre").val(current["FIELD23"]);
							$("#BS607A\\.PersonaContact\\.txtApel1").val(current["FIELD24"]);
							$("#BS607A\\.PersonaContact\\.txtApel2").val(current["FIELD25"]);
							$("#BS607A\\.PersonaContact\\.txtNifCif").val(current["FIELD26"]);

							$("#BS607A\\.PersonaContact\\.txtDireccion").val(current["FIELD28"]);
							$("#BS607A\\.PersonaContact\\.txtNumero").val(current["FIELD29"]);
							$("#BS607A\\.PersonaContact\\.txtPiso").val(current["FIELD30"]);
							$("#BS607A\\.PersonaContact\\.txtPuerta").val(current["FIELD31"]);
							$("#BS607A\\.PersonaContact\\.txtLugar").val(current["FIELD32"]);

							$("#BS607A\\.DestFechSolicit\\.txtDestino1").val(current["FIELD33"]);
							$("#BS607A\\.DestFechSolicit\\.txtFechaDest1").val(current["FIELD34"]);
							$("#BS607A\\.DestFechSolicit\\.txtDestino2").val(current["FIELD35"]);
							$("#BS607A\\.DestFechSolicit\\.txtFechaDest2").val(current["FIELD36"]);
							
							$("#BS607A\\.SaludSolicit\\.rbRadio\\.1").prop("checked", true);
							$("#BS607A\\.SaludSolicit\\.rbRadio\\.14").prop("checked", true);   // Dieta no
							
							$("#BS607A\\.DatEconomicos\\.txtCuantiaMensual").val(current["FIELD40"]);
							$("#BS607A\\.DatEconomicos\\.cvCasilla\\.1").prop("checked", true);

							$("#BS607A\\.Autorizacion1\\.rbRadio\\.1").prop("checked", true);
							$("#BS607A\\.Autorizacion2\\.rbRadio\\.1").prop("checked", true);
							$("#BS607A\\.Autorizacion3\\.rbRadio\\.1").prop("checked", true);
							$("#BS607A\\.Autorizacion4\\.rbRadio\\.1").prop("checked", true);

					    } else {
					    	console.log("No match");
					    	console.log(fullName);
					    	console.log(current["FIELD3"] + " " + current["FIELD4"] + " " + current["FIELD5"])
					    }
					});
				});
			}
			
                        // var url = endpoint + "/pdata-manager/api/v1/pData/download?fileFormat=CSV";
			// var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			// console.log(tokenData);

			// $.ajax({
			// 	url: url,
			// 	type: 'GET',
			// 	contentType: "application/json; charset=utf-8",
			// 	success: function (json) {
			// 		console.log(json);
			// 		var data = encodeURIComponent(json);


			// 		$("<a />", {
			// 			"download": "data.csv",
			// 			"href": "data:application/json;charset=utf-8," + data
			// 		}).appendTo("body")
			// 		.click(function () {
			// 			$(this).remove()
			// 		})[0].click()
					
			// 	},
			// 	error: function (jqxhr, textStatus, err) {
			// 		console.log(textStatus + ",	" + err);
					
			// 	},
			// 	beforeSend: function (xhr) {
			// 		xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);
			// 		xhr.setRequestHeader('accountId', username);

			// 	}

			// });

		}
		
		
		
		this.cdv_removeCDV = function () {

			var dataUser = JSON.parse(localStorage.userData || 'null');
			var url = endpoint + "/account-manager/api/v1/accounts/"+username;
			var tokenData = JSON.parse(localStorage.aacTokenData || 'null');
			console.log(tokenData);

			$.ajax({
				url: url,
				type: 'DELETE',
				contentType: "application/json; charset=utf-8",
				success: function (json) {
					console.log(json);
										
				},
				error: function (jqxhr, textStatus, err) {
					console.log(textStatus + ",	" + err);
					
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.access_token);
					
				}

			});

		}

		// pdata
		function PData(userId, slrId) {
			this.user_id = userId;
			this.slr_id = slrId;
			this.properties = [];
			this.toJsonString = function () {
				return JSON.stringify(this);
			};
		};

		// Helper function to serialize all the form fields into a JSON string
		function formFieldsToJSON(slrId, userId, fields) {
			var properties = [];
			var jsonStr = JSON.stringify({
					"slr_id": slrId,
					"user_id": userId,
					"properties": []
				});
			var obj = JSON.parse(jsonStr);
			var n = fields.length;
			for (var i = 0; i < n; i++) {
				
				var propertyField= fields[i];
					propertyField=propertyField.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
				
				
				console.log(propertyField+"-"+$('#'+propertyField).val());
				
				if ($('#' + propertyField).val())
					obj['properties'].push({
						"key": fields[i],
						"values": [$('#' + propertyField).val()]
					});
			}
			jsonStr = JSON.stringify(obj);
			return jsonStr;
		}

		// Helper function to serialize all account fields into a JSON string
		function accountToJSON(userId, firstname, lastname) {
			var properties = [];
			var jsonStr = JSON.stringify({
					"username": firstname + "." + lastname + userId + serviceID
					
				});
			var partStr = JSON.stringify({
					"firstname": firstname,
					"lastname": lastname
				});
			var obj = JSON.parse(jsonStr);
			var part = JSON.parse(partStr);
			obj['particular'] = part;

			jsonStr = JSON.stringify(obj);
			return jsonStr;
		}

		// Helper function to serialize all slr fields into a JSON string
		function slrToJSON(userId, serviceId, serviceURL) {
			var properties = [];
			var jsonStr = JSON.stringify({
					"serviceId": serviceId,
					"serviceUri": serviceURL,
					"userId": userId
				});
			return jsonStr;
		}

		return {
			init: initComponent,
			cdv_getdata: cdv_getdata,
			cdv_postdata: cdv_postdata,
			initializeSLR: cdv_getSLink,
			initializeAccount: cdv_getAccount,
			createSLR: cdv_createSLR,
			createAccount: cdv_createAccount,
			exportData: cdv_exportData,
			removeCDV: cdv_removeCDV
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

function setFieldValue(target, value) {
	$('#' + target).val(value).focus();
	$('#' + target).css({
		'border-width': '2px'
	});
}

function openCDV() {
	window.open(cdvDashUrl, "_blank");
}