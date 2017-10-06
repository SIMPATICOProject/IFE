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
    authority: "internal"
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
    primaryColor: "#24BCDA",
    secondaryColor:"#D3F2F8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    questionsBoxClassName: "simp-ctz-ui-qb",
    questionsBoxTitle: "Preguntas relacionadas", //"RELATED QUESTIONS",
    addQuestionLabel: "+ Añadir nueva pregunta", //"+ Add new question",
    diagramNotificationImage: "./img/diagram.png",
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
    wordPropertiesClassName: "simp-tae-ui-word"
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
		topBarHeight: 60,
		errorLabel: {
			'block1' : 'Manca il codice fiscale',
			'block4' : 'Manca selezione Part-time / Full-time'
		}
  });

  // Declare here the buttons that will be available in the Simpatico Bar
  // The first one is the login button. This is mandatory but it also can be personalised
  // Options available:
  buttons = [{
                  id: "simp-bar-sw-login",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "./img/ic_on.png",
                  imageSrcDisabled: "./img/login.png",
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
                  imageSrcEnabled: "./img/citizenpedia.png",
                  imageSrcDisabled: "./img/citizenpedia.png",
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
                  imageSrcEnabled: "./img/simplify.png",
                  imageSrcDisabled: "./img/simplify.png",
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
//                    imageSrcEnabled: "./img/enrich.png",
//                    imageSrcDisabled: "./img/enrich.png",
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
                  imageSrcEnabled: "./img/cdv.png",
                  imageSrcDisabled: "./img/cdv.png",
                  alt: "Datos de los ciudadanos",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-cdv",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return cdvUI.getInstance().isEnabled(); },
                  enable: function() { cdvUI.getInstance().enable(); },
                  disable: function() { cdvUI.getInstance().disable(); },
		              text: "Datos"
		            }
//                },
//                { // workflow adaptation. Switch to the modality, where the form adaptation starts
//                  id: 'workflow1',
//                  imageSrcEnabled: "./img/forms.png",
//                  imageSrcDisabled: "./img/forms.png",
//                  alt: "Simplifica proceso",
//                  // Ad-hoc css classes to define the enabled/disabled styles
//                  styleClassEnabled: "simp-bar-btn-active-wae",
//                  styleClassDisabled: "simp-bar-btn-inactive",
//
//                  isEnabled: function() { return waeUI.getInstance().isEnabled(); },
//                  enable: function() { var idProfile = null; waeUI.getInstance().enable(idProfile); },
//                  disable: function() { waeUI.getInstance().disable(); }
//                }
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
                                '<img src="./img/logo.png" ' +
                                'height="50px" ' +
                                'alt="Simpatico ">' +
                              '</a>' +
                            '</div>'+
			    '<div id="simpatico-bar-copy">'+simpaticoCopy+'</div>';

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
});

// Save the time spent in the website by calling the function here
window.addEventListener('beforeunload', function (e) {
  logCORE.getInstance().logTimeEvent({});
});
