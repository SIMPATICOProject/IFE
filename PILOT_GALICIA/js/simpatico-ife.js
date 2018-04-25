// Simpatico main Interactive Front-End (simpatico-ife.js)
//-----------------------------------------------------------------------------
// This JavaScript is the main entry point to  the Interactive Front-End 
// component of the Simpatico Project (http://www.simpatico-project.eu/)
//
//-----------------------------------------------------------------------------

// It inits all the enabled features of IFE 
function initFeatures() {

  // Init the Auth component (see simpatico-auth.js)
  // - endpoint: the main URL of the used AAC instance
  // - clientID: the IFE Client ID registered
  // - authority: the used authentication mechanism or null if many allowed
  // - redirect: url redirect (default is /IFE/login.html)
  authManager.getInstance().init({
    endpoint: 'https://simpatico.hi-iberia.es:4570/aac/',
    // Google
    //clientID: '5c24dd95-a1b4-4208-ab5a-ce288963fe28',
    //authority: "google"
    // Internal
    clientID: 'f21558f2-0992-47b1-85af-1ada614d8cc6',
    authority: "internal",
    redirect: 'https://simpatico.hi-iberia.es:4570/IFE/login.html',
  });

    // Init the LOG component (see log-core.js)
  // - endpoint: the main URL of the used LOG instance
  logCORE.getInstance().init({
	  endpoint: "https://simpatico.hi-iberia.es:4570/simpatico/api"
  });

  // Init the Citizenpedia component (see ctz-ui.js)
  // - endpoint: the main URL of the used Citizenpedia instance
  // - primaryColor: Color used to highlight the enhanced components
  // - secondaryColor: Color used to paint the question boxes backgrounds
  // - elementsToEnhanceClassName: The CSS class used to define the enhanced elements
  // - questionsBoxClassName: The CSS class of the box which shows questions
  // - questionsBoxTitle: Title of the box hwich shows questions
  // - addQuestionLabel: Text exposed to show the action to create a question
  // - diagramNotificationImage: Image to show when a diagram is found
  // - diagramNotificationClassName: The CSS class of the img shown when a diagram is found
  // - diagramNotificationText: The text to notify that a diagram
  citizenpediaUI.getInstance().init({
    endpoint: 'https://simpatico.hi-iberia.es:4569/qae',
    cpdDiagramEndpoint: 'https://simpatico.hi-iberia.es:4570/cpd/api/diagram/eService',
    primaryColor: "#24BCDA",
    secondaryColor:"#D3F2F8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    questionsBoxClassName: "simp-ctz-ui-qb",
    questionsBoxTitle: "Preguntas relacionadas", //"RELATED QUESTIONS",
    addQuestionLabel: "+ Añadir nueva pregunta", //"+ Add new question",
    diagramNotificationImage: "../img/diagram.png",
    diagramNotificationClassName: "simp-ctz-ui-diagram",
    diagramNotificationText: "Hay un diagrama relacionado con este servicio en la Citizenpedia"
  });
  
  // Init the CDV component (see cdv-ui.js)
  // - endpoint: the main URL of the used cdv instance
  // - serviceID: the id corresponding to the e-service
  // - serviceURL: the id corresponding to the e-service
  // - dataFields: eservice field ids mapped with cdv
  // - cdvColor: Color used to highlight the eservice fields enhanced with cdv 
  // - dialogTitle: Title of the dialog box of CDV component
  // - tabPFieldsTitle: tab label of personal data
  cdvUI.getInstance().init({
    endpoint: 'https://simpatico.hi-iberia.es:4570',
    serviceID: simpaticoEservice,
	  serviceName: serviceName,
    serviceURL: serviceURL,
    dataFields: simpaticoMapping,
    cdvColor: '#008000',
    dialogTitle: 'Gestor de datos',
    tabPFieldsTitle: 'Mis datos',
    entryMessage: 'Gestor de datos personales de SIMPATICO',
    statusMessage: 'Aquí podrá guardar sus datos para no tener que introducirlos siempre a mano',
    notextMessage: 'Ningún campo seleccionado',
    dialogSaveTitle: 'Datos guardados',
    dialogSaveMessage: 'Dats guardados correctamente.',
    statusMessageNoAccount: "¿Crear cuenta de datos?",
    statusMessageNoActive: "Gestor de datos no activo. ¿Activar?",
    confirmSaveDataMessage: "¿Actualizar sus datos?",
    buttonSaveData:"Guardar datos",
    buttonManageData:"Modificar datos",
    buttonActivate:"Activar",
    buttonCreate: "Crear",
    consentButton: "Aceptar",
    tabSettingsTitle: 'Opciones',
	  cdvDashUrl:'http://localhost:8080/cdv-dashboard/index.html'
  });

  // Init the Text Adaptation Engine component (see tae-ui.js)
  // - endpoint: the main URL of the used TAE instance
  // - language: the language of the text to adapt by the TAE instance
  // - primaryColor: Color used to highlight the enhanced components
  // - secondaryColor: Color used to paint the simplification boxes backgrounds
  // - elementsToEnhanceClassName: The CSS class used to define the enhanced elements
  // - simplifyBoxClassName: The CSS class of the box which shows the simplifications
  // - simplifyBoxTitle: Title of the box which shows the simplifications
  // - wordPropertiesClassName: The CSS class of the word properties box
  taeUI.getInstance().init({
    endpoint: 'https://simpatico.hi-iberia.es:4570/simp-engines/tae',
    language: '',
    primaryColor: "#DE453E",
    secondaryColor:"#F0ABA8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    simplifyBoxClassName: "simp-tae-ui-sb",
    simplifyBoxTitle: "Texto simplificado",
    wordPropertiesClassName: "simp-tae-ui-word",
    synonymLabel:'Sinónimos',
  	definitionLabel: 'Definición',
    emptyText: 'No hay palabras que necesiten ser simplificadas'
  });

  // Init the Text Adaptation Engine component for free text selection (see tae-ui-popup.js)
  // - language: the language of the text to adapt by the TAE instance
  // - endpoint: the main URL of the used TAE instance
  // - dialogTitle: popup title
  // - tabDefinitionsTitle: title of 'definitions' tab
  // - tabSimplificationTitle: title of 'simplifications' tab
  // - tabWikipediaTitle: title of 'wikipedia' tab
  // - entryMessage: label of 'enter text' hint
  // - notextMessage: label of 'no text selected' hint
  taeUIPopup.getInstance().init({
		lang: 'it',
		endpoint: 'https://simpatico.hi-iberia.es:4570/simp-engines/tae',
		dialogTitle: 'Texto Enriquecido',
		tabDefinitionsTitle: 'Definiciones',
		tabSimplificationTitle: 'Simplificación',
		tabWikipediaTitle: 'Wikipedia',
		entryMessage: 'Seleccione un método de ayuda',
		notextMessage: 'No hay texto seleccionado'
	});
  // Init the Workflow Adaptation Engine component (see wae-ui.js)
  // - endpoint: the main URL of the used WAE instance
  // - prevButtonLabel: Label for 'previous step' button
  // - nextButtonLabel: Label for 'next step' button
  // - topBarHeight: height of the bar to control the scroll
  // - errorLabel: map with blockId - error message in case of block precondition fails
  waeUI.getInstance().init({
		endpoint: 'https://simpatico.hi-iberia.es:4570/simp-engines/wae',
		prevButtonLabel: 'Anterior',
		nextButtonLabel: 'Siguiente',
		topBarHeight: 60,
		errorLabel: ERROR_LABELS
  });

  // Init the Session Feedback component (see sf-ui.js)
  // - buttonToShowSfId: the id of the button/link that opens the dialog of the feedback form
  // - apiEndpoint: the main URL of the logs API server (<site>/simpatico/api)
  // NOTE: Requires jquery-ui to work properly
  sfUI.getInstance().init({
    language: 'it',
    buttonToShowSfId: 'Salvar',
    apiEndpoint: 'https://simpatico.hi-iberia.es:4570/simpatico/api',
  });

  // Init the Data Analysis component (see da-ui.js)
  // It is useful for UI elements like different tabs in the same view or an accordion.
  // - elementsToTrackTimeClassName: The CSS class used to define the different tabs
  // - apiEndpoint: the main URL of the logs API server (<site>/simpatico/api)
  daUI.getInstance().init({
    elementsToTrackTimeClassName: '',
    apiEndpoint: '',
		endpoint: '',
		prevButtonLabel: 'Anterior',
		nextButtonLabel: 'Siguiente',
		topBarHeight: 60
  });

  // Declare here the buttons that will be available in the Simpatico Bar
  // The first one is the login button. This is mandatory but it also can be personalised
  // Options available:
  buttons = [{
                  id: "simp-bar-sw-login",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "../img/ic_on.png",
                  imageSrcDisabled: "../img/login.png",
                  alt: "Entrar",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-none", 
                  styleClassDisabled: "simp-none",
                  
                  isEnabled: function() { return authManager.getInstance().isEnabled(); },
                  enable: function() { authManager.getInstance().enable(); },
                  disable: function() { authManager.getInstance().disable(); },
		              text: "Entrar"
                },

                {
                  id: "simp-bar-sw-citizenpedia",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "../img/citizenpedia.png",
                  imageSrcDisabled: "../img/citizenpedia.png",
                  alt: "Preguntas y respuestas",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return citizenpediaUI.getInstance().isEnabled(); },
                  enable: function() { citizenpediaUI.getInstance().enable(); },
                  disable: function() { citizenpediaUI.getInstance().disable(); },
		              text: "Preguntas"
                },

                {
                  id: "simp-bar-sw-tae",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "../img/simplify.png",
                  imageSrcDisabled: "../img/simplify.png",
                  alt: "Simplificación de texto",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-tae",
                  styleClassDisabled: "simp-bar-btn-inactive-tae",

                  isEnabled: function() { return taeUI.getInstance().isEnabled(); },
                  enable: function() { taeUI.getInstance().enable(); },
                  disable: function() { taeUI.getInstance().disable(); },
		              text: "Simplificar"
                },
                
//                {
//                    id: "simp-bar-sw-tae-popup",
//                    // Ad-hoc images to define the enabled/disabled images
//                    imageSrcEnabled: "../img/enrich.png",
//                    imageSrcDisabled: "../img/enrich.png",
//                    alt: "Simplificación de texto libre",
//                    // Ad-hoc css classes to define the enabled/disabled styles
//                    styleClassEnabled: "simp-bar-btn-active-tae",
//                    styleClassDisabled: "simp-bar-btn-inactive-tae",
//
//                    isEnabled: function() { taeUIPopup.getInstance().isEnabled(); },
//                    enable: function() { 
//                    	taeUIPopup.getInstance().showDialog(); 
//                    },
//                    disable: function() { 
//                    	taeUIPopup.getInstance().hideDialog(); 
//                    }
//                  },
                {
                  id: "simp-bar-sw-cdv",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "../img/cdv.png",
                  imageSrcDisabled: "../img/cdv.png",
                  alt: "Datos de los ciudadanos",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-cdv",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return cdvUI.getInstance().isEnabled(); },
                  enable: function() { cdvUI.getInstance().enable(); },
                  disable: function() { cdvUI.getInstance().disable(); },
		              text: "Datos"
		            },
                { // workflow adaptation. Switch to the modality, where the form adaptation starts
                  id: 'workflow1',
                  imageSrcEnabled: "../img/forms.png",
                  imageSrcDisabled: "../img/forms.png",
                  alt: "Simplificar proceso",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-wae",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return waeUI.getInstance().isEnabled(); },
                  enable: function() { var idProfile = null; waeUI.getInstance().enable(idProfile); },
                  disable: function() { waeUI.getInstance().disable(); },
                  text: "Guía"
                }
            ];
}//initFeatures()

// It creates the HTML code corresponding to the button passed as parameter
// - button: The button object stored in buttons
function createButtonHTML(button) {
  return '<li class="'+ button.styleClassDisabled +'" id="' + button.id + '" '+
                          'onclick="toggleAction(\'' + button.id + '\');">'+
			  '<figure>'+
                          //'<a href="#">' +
                          '<img ' +
                            'alt="' + button.alt + '" ' + 
                            'title="' + button.alt + '" ' +
                            'id="' + button.id + '-img" ' +
                            'src="' + button.imageSrcDisabled + '" ' +
                            'width="50" height="50" />' +
                            //'</a>'+
	                    '<figcaption id="'+button.id +'-fig" style="text-align: center;">'+
                            button.text + 
                            '</figcaption>' + 
                          '</figure>' + 
                          '</li>';
}//createButtonHTMLbutton()

// It creates the Node corresponding to the button passed as parameter
// - button: The button object stored in buttons
function createButtonNode(button) {
  var template = document.createElement("div");
  template.innerHTML = createButtonHTML(button);
  return template.childNodes[0];
}//createButtonNode(button)

// It creates the configured buttons and adds them to the toolbar
// Called one time
function enablePrivateFeatures() {
  // Update the login button status
  var loginButton = document.getElementById(buttons[0].id);
  loginButton.childNodes[0].src = buttons[0].imageSrcEnabled;
  
  // For each button (without the login one) create and add the node
  var buttonsContainer = document.getElementById("simp-bar-container-left");
  while (buttonsContainer.firstChild) {
    cuttonsContainer.removeChild(buttonsContainer.firstChild);
  }
  for (var i = 1, len = buttons.length; i < len; i++) {
    buttonsContainer.appendChild(createButtonNode(buttons[i]), loginButton);
  }
  document.getElementById("simpatico-bar-copy").style.display = "none";
  document.getElementById("simp-bar-sw-login-fig").innerHTML = "Salir";
}//enablePrivateFeatures(id)

// It inits all the configured buttons
// Called one time
function disablePrivateFeatures() {
  // Update the login button status
  var loginButton = document.getElementById(buttons[0].id);
  loginButton.childNodes[0].src = buttons[0].imageSrcDisabled;

  // For each button (without the login one) remove the node 
  for (var i = 1, len = buttons.length; i < len; i++) {
    currentButton = document.getElementById(buttons[i].id);
    if (null != currentButton) {
      buttons[i].disable();
      currentButton.parentNode.removeChild(currentButton);
    }
  }
  document.getElementById("simpatico-bar-copy").style.display = "inline-block";
  document.getElementById("simp-bar-sw-login-fig").innerHTML = "Entrar";
}//disablePrivateFeatures()

// It adds the Simpatico Toolbar inside the component of which id is passed 
// as parameter
// - containerID: the Id of the element which is going to contain the toolbar 
function addSimpaticoBar(containerID) {
  var simpaticoCopy = "SIMPATICO te ayudará con tus gestiones. Entra aquí";
  var simpaticoBarContainer = document.getElementById(containerID);
  if (simpaticoBarContainer == null) {
    var body = document.getElementsByTagName('body')[0];
    simpaticoBarContainer = document.createElement('div');
    body.insertBefore(simpaticoBarContainer, body.firstChild);
  }

  // Create the main div of the toolbar
  var simpaticoBarHtml = '<div id="simp-bar">' +
                            '<div style="margin: 1%;">' +
                              '<a href="#">' +
                                '<img src="../img/logo.png" ' +
                                'height="50px" ' +
                                'alt="Simpatico ">' +
                              '</a>' +
                            '</div>'+
			    '<div id="simpatico-bar-copy" onclick="toggleAction(\'simp-bar-sw-login\');">'+simpaticoCopy+'</div>';

  // Add the left side of the toolbar
  //simpaticoBarHtml += '<ul id="simp-bar-container-left"></ul>';
  simpaticoBarHtml += '<ul id="simp-bar-container-left" style="position: absolute;"></ul>';

  // Add the right side of the toolbar
  simpaticoBarHtml += '<ul id="simp-bar-container-right">' + 
                         '<li><span id="simp-usr-data"></span></li>' +
                          createButtonNode(buttons[0]).outerHTML +
                      '</ul>';

  // Close the main div
  simpaticoBarHtml += '</div>';
  
  // Add the generated bar to the container
  simpaticoBarContainer.innerHTML = simpaticoBarHtml;
}//addSimpaticoBar()

// switch on/off the control buttons.
// -id: of the button which calls this function
function toggleAction(id) {
  var clickedButon;
  if (buttons[0].id == id) {
    // Login button
    clickedButon = buttons[0];
  } else {
    // Disable all the buttons
    for (var i = 1, len = buttons.length; i < len; i++) {
      if(buttons[i].id == id) {
        clickedButon = buttons[i];
      } else {
        buttons[i].disable();
        updateButtonStyle(buttons[i]);
      }
    } 
  }
  // Enable/Disable the selected button
  if (clickedButon.isEnabled()) {
    clickedButon.disable();
  } else {
    clickedButon.enable();
  }
  updateButtonStyle(clickedButon);
} //toggleAction(id)


// Adds the corresponding styleClass depending on the current feature status
// - button: to be updated
function updateButtonStyle(button) {
  if (button.isEnabled()) {
    document.getElementById(button.id).classList.remove(button.styleClassDisabled);
    document.getElementById(button.id).classList.add(button.styleClassEnabled);
  } else {
    document.getElementById(button.id).classList.remove(button.styleClassEnabled);
    document.getElementById(button.id).classList.add(button.styleClassDisabled);
  }
}

// Once the document is loaded the Simpatico features are initialised and the 
// toolbar added
document.addEventListener('DOMContentLoaded', function () {
  initFeatures();
  addSimpaticoBar("simpatico_top");
  authManager.getInstance().updateUserData();
  //citizenpediaUI.getInstance().enable();

  var query = location.search.split('goto=')[1];

  if (query) {
        var position = query.split(',');
        if (position[0] == simpaticoEservice)
        {
        console.log ("Let's open "+position[1]);
        toggleAction('simp-bar-sw-citizenpedia');
        toggleAction('simp-bar-sw-citizenpedia');
        citizenpediaUI.getInstance().paragraphEvent(position[1]);

  }
}
});

// Save the time spent in the website by calling the function here
window.addEventListener('beforeunload', function (e) {
  logCORE.getInstance().logTimeEvent({});
});

//////////////////////////////////
function fillData(fileName)
{
var dataUser = JSON.parse(localStorage.userData || 'null');
            var name = dataUser.name;
            var surname = dataUser.surname;

            console.log(name);
            console.log(surname);

            var fullName = name + " " + surname; 

            if (simpaticoEservice == "BS613B") {
                $.get('../js/' + fileName, function (data) {
                    // Fill fields with data from json

                    // Data es un ARRAY de usuarios
                    // TODO: Bucle para buscar al usuario con name + " " + surname == data[i]["FIELD3"] + " " + data[i][FIELD4] + " " + data[i]["FIELD5"]

                    data.forEach(function(current, index, array) {
                        console.log(current);

                        var nameJSON = current["FIELD3"];

                        var firstSurnameJSON = current["FIELD4"];

                        var secondSurnameJSON = current["FIELD5"];

                                        
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
                            $("#BS613B\\.Entidad\\.txtTelefono").val(current["FIELD14"]);
                            $("#BS613B\\.Entidad\\.txtMovil").val(current["FIELD14"]); // Igual que teléfono
                            $("#BS613B\\.Entidad\\.txtEmail").val(current["FIELD15"]);

                           // $("#BS613B\\.Cuenta\\.txtTitular").val(current["FIELD15"]);
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
                            console.log("'" + fullName + "'");
                            console.log("'" + current["FIELD3"] + " " + current["FIELD4"] + " " + current["FIELD5"] + "'")
                        }
                    });
                });
            } else {
                $.get('../js/' + fileName, function (data) {
                    // Fill fields with data from json

                    // Data es un ARRAY de usuarios
                    // TODO: Bucle para buscar al usuario con name + " " + surname == data[i]["FIELD3"] + " " + data[i][FIELD4] + " " + data[i]["FIELD5"]

                    data.forEach(function(current, index, array) {
                        console.log(current);

                        var nameJSON = current["FIELD3"];

                        var firstSurnameJSON = current["FIELD4"];

                        var secondSurnameJSON = current["FIELD5"];

                                        
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
                            $("#BS607A\\.Entidad\\.txtTelefono").val(current["FIELD14"]);
                            $("#BS607A\\.Entidad\\.txtMovil").val(current["FIELD14"]); // Igual que teléfono
                            $("#BS607A\\.Entidad\\.txtEmail").val(current["FIELD15"]);

//                            $("#BS607A\\.HijoDiscap\\.txtNombre").val(current["FIELD15"]);
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
                            console.log("'" + fullName + "'");
                            console.log("'" + current["FIELD3"] + " " + current["FIELD4"] + " " + current["FIELD5"] + "'")
                        }
                    });
                });
            }


}

