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
    endpoint: 'https://tn.smartcommunitylab.it/aac', 
    clientID: '8ab03990-d5dd-47ea-8fc6-c92a3b0c04a4',
    authority: null,
    redirect: 'https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/logincb.html',
    greeting: 'ACCEDI A SIMPATICO'
  });
  
  // Init the LOG component (see log-core.js)
  // - endpoint: the main URL of the used LOG instance
  // - testMode: true if the data should not be sent to the LOG component
  logCORE.getInstance().init({
	  testMode: true,
	  endpoint: "https://simpatico.smartcommunitylab.it/simpatico-logs/api"
  });

  // Init the Citizenpedia component (see ctz-ui.js)
  // - endpoint: the main URL of the used Citizenpedia instance
  // - cpdDiagramEndpoint: endpoint of the CPD process summary service (should end with eService)
  // - primaryColor: Color used to highlight the enhanced components
  // - secondaryColor: Color used to paint the question boxes backgrounds
  // - elementsToEnhanceClassName: The CSS class used to define the enhanced elements
  // - questionsBoxClassName: The CSS class of the box which shows questions
  // - questionsBoxTitle: Title of the box hwich shows questions
  // - addQuestionLabel: Text exposed to show the action to create a question
  // - diagramNotificationImage: Image to show when a diagram is found
  // - diagramNotificationClassName: The CSS class of the img shown when a diagram is found
  // - diagramNotificationText: The text to notify that a diagram
  // - questionSelectionFilters: filters for text selection to ask question for
  citizenpediaUI.getInstance().init({
    endpoint: 'https://simpatico.smartcommunitylab.it/qae',
    cpdDiagramEndpoint: 'https://dev.smartcommunitylab.it/cpd/api/diagram/eService',
    primaryColor: "#24BCDA",
    secondaryColor:"#D3F2F8",
    elementsToEnhanceClassName: "simpatico-query-and-answer",
    questionsBoxClassName: "simp-ctz-ui-qb",
    questionsBoxTitle: "Domande legate",
    addQuestionLabel: "+ Aggiungi una domanda",
    diagramNotificationImage: "https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/diagram.png",
    diagramNotificationClassName: "simp-ctz-ui-diagram",
    diagramNotificationText: "C'e' una visualizzazione di e-service in Citizenpedia",
    questionSelectionFilters: ['h1', '.Rigaintestazione', '.Rigaintestazioneridotta']
  });

  taeUIInline.getInstance().init({
    endpoint: 'https://simpatico.smartcommunitylab.it/simp-engines/tae',
    textContainerQuery: "block-stu3-italia-content",
    elementId: 'simp-bar-sw-tae-inline',
    synonimLabel:'Sinonimi',
    definitionLabel: 'Definizione',
    simplifedTextLabel: 'Testo semplificato'
  });


  
  // Declare here the buttons that will be available in the Simpatico Bar
  // The first one is the login button. This is mandatory but it also can be personalised
  // Options available:
  buttons = [
                {	// TAE
                    id: "simp-bar-sw-tae-inline",
                    // Ad-hoc images to define the enabled/disabled images
                    imageSrcEnabled: "./resources/images/textTool.png",
                    imageSrcDisabled: "./resources/images/textTool.png",
                    alt: "Semplificazione del testo selezionato",
                    // Ad-hoc css classes to define the enabled/disabled styles
                    styleClassEnabled: "simp-none", 
                    styleClassEnabled: "simp-none", 
                    label: 'Semplificazione testo',
                    isEnabled: function() { return false; },
                    enable: function() { 
                    	console.log(window.getSelection().toString().trim());
                    	taeUIInline.getInstance().showDialog(); 
                    },
                    disable: function() { 
                    	taeUIInline.getInstance().hideDialog(); 
                    },
                    exclusive: true
                  },
                  {
                    id: "simp-bar-sw-cpd",
                    // Ad-hoc images to define the enabled/disabled images
                    imageSrcEnabled: "./resources/images/procedure.png",
                    imageSrcDisabled: "./resources/images/procedure.png",
                    alt: "Procedura",
                    // Ad-hoc css classes to define the enabled/disabled styles
                    styleClassEnabled: "simp-none", 
                    styleClassDisabled: "simp-none",
                    
                    isEnabled: function() { return citizenpediaUI.getInstance().isEnabled(); },
                    enable: function() { citizenpediaUI.getInstance().openDiagram(); },
                    disable: function() { citizenpediaUI.getInstance().disable(); }
                  },
                  {
                    id: "simp-bar-sw-login",
                    // Ad-hoc images to define the enabled/disabled images
                    imageSrcEnabled: "./resources/images/access.png",
                    imageSrcDisabled: "./resources/images/access.png",
                    alt: "Entra",
                    // Ad-hoc css classes to define the enabled/disabled styles
                    styleClassEnabled: "simp-none", 
                    styleClassDisabled: "simp-none",
                    
                    isEnabled: function() { return authManager.getInstance().isEnabled(); },
                    enable: function() { authManager.getInstance().enable(); },
                    disable: function() { authManager.getInstance().disable(); }
                  },
                  { // CITIZENPEDIA
                    id: "simp-bar-sw-citizenpedia",
                    // Ad-hoc images to define the enabled/disabled images
                    imageSrcEnabled: "./resources/images/questions.png",
                    imageSrcDisabled: "./resources/images/questions.png",
                    alt: "Accedi alle domande e risposte associate agli elementi del modulo",
                    // Ad-hoc css classes to define the enabled/disabled styles
                    styleClassEnabled: "simp-none", 
                    styleClassDisabled: "simp-none", 
                    label: 'Domande e risposte',
                    isEnabled: function() { return citizenpediaUI.getInstance().isEnabled(); },
                    enable: function() { citizenpediaUI.getInstance().openQuestionDiagram(); },
                    disable: function() { citizenpediaUI.getInstance().disable(); }
                  },
                 
            ];
}//initFeatures()

// It creates the HTML code corresponding to the button passed as parameter
// - button: The button object stored in buttons
function createButtonHTML(button) {
  return '<li class="'+ button.styleClassDisabled +'" id="' + button.id + '" ' +'onclick="toggleAction(\'' + button.id + '\');"'+
                          '">'+
                          //'<a href="#">' +
                          '<img ' + 
                            'alt="' + button.alt + '" ' + 
                            'title="' + button.alt + '" ' +
                            'id="' + button.id + '-img" ' +
                            'src="' + button.imageSrcDisabled + '" ' +
                            '/>' +
                            //(button.label ? ('<div class="toolbar-button-label">'+ button.label+'</div>') :'')+
                            //'</a>'+
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
  // TODO Update the login button status
  
  // For each button (without the login one) create and add the node
  var buttonsContainer = document.getElementById("simp-bar-container-left");
  for (var i = 0, len = buttons.length; i < len; i++) {
    if (document.getElementById(buttons[i].id) == null) {
      buttonsContainer.appendChild(createButtonNode(buttons[i]));
    }
  }
}//enablePrivateFeatures(id)

// It inits all the configured buttons
// Called one time
function disablePrivateFeatures() {
  // TODO Update the login status
}//disablePrivateFeatures()

// It adds the Simpatico Toolbar inside the component of which id is passed 
// as parameter
// - containerID: the Id of the element which is going to contain the toolbar 
function addSimpaticoBar(containerID) {
  var simpaticoBarContainer = document.getElementById(containerID);
  if (simpaticoBarContainer == null) {
    var body = document.getElementsByTagName('body')[0];
    simpaticoBarContainer = document.createElement('div');
    body.insertBefore(simpaticoBarContainer, body.firstChild);
  }

  // Create the main div of the toolbar
  var simpaticoBarHtml = '<div id="simp-bar">' +
                            '<div>' +
                              //'<a href="#">' +
                                '<img class="logoSmall" src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/logo.png" ' +
                                'alt="Simpatico ">Simpatico' +
                              //'</a>' +
                            '</div>';

  // Add the left side of the toolbar
  simpaticoBarHtml += '<ul id="simp-bar-container-left"></ul>';

  // Add the right side of the toolbar
  simpaticoBarHtml += '<ul id="simp-bar-container-right">' + 
                         '<li  style="display:none"><span id="simp-usr-data"></span></li>' +
                        //   createButtonNode(buttons[0]).outerHTML +
                      '</ul>';

  // Close the main div
  simpaticoBarHtml += '</div>';
  
  // Add the generated bar to the container
  simpaticoBarContainer.innerHTML = simpaticoBarHtml;
}//addSimpaticoBar()

// switch on/off the control buttons.
// -id: of the button which calls this function
function toggleAction(id) {
  var clickedButton;
  if (buttons[0].id == id) {
    // Login button
    clickedButton = buttons[0];
  } else {
    // Disable all the buttons
    for (var i = 1, len = buttons.length; i < len; i++) {
      if(buttons[i].id == id) {
        clickedButton = buttons[i];
      }
    } 
    if (!!clickedButton && clickedButton.exclusive) {
    	buttons.forEach(function(b){
    		if (b.exclusive && b.id != clickedButton.id) b.disable();
    	});
    }
  }
  // Enable/Disable the selected button
  if (clickedButton.isEnabled()) {
	  clickedButton.disable();
  } else {
	  clickedButton.enable();
  }
  updateButtonStyle(clickedButton);
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
  enablePrivateFeatures();
  authManager.getInstance().updateUserData();
  
  
  var link = document.createElement( "link" );
  link.href = "https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/css/moduli.css";
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName( "head" )[0].appendChild( link );
  // link = document.createElement( "link" );
  // link.href = "../css/simpatico.css";
  // link.type = "text/css";
  // link.rel = "stylesheet";
  // document.getElementsByTagName( "head" )[0].appendChild( link );
  // link = document.createElement( "link" );
  // link.href = "css/trento.css";
  // link.type = "text/css";
  // link.rel = "stylesheet";
  // document.getElementsByTagName( "head" )[0].appendChild( link );
  link = document.createElement( "link" );
  link.href = "https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css";
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName( "head" )[0].appendChild( link );
  
  checkShowTutorial();
});

window.addEventListener('beforeunload', function (e) {
  logCORE.getInstance().setSyncMode();	
  logCORE.getInstance().ifeLogger.sessionEnd(simpaticoEservice);
  if (window.simpaticoForm) {
      // log end of session
	  logCORE.getInstance().ifeLogger.formEnd(simpaticoEservice, simpaticoForm);
  }
});

dialog_tutorial = null;
dialog_step = 0;
function checkShowTutorial() {
	if (!localStorage.simpatico_tutorial_shown || localStorage.simpatico_tutorial_shown == 'null') {
		

		setTimeout(function(){
			dialog_tutorial = $(
					'<div id="dialog-tutorial">' +
					'	<div id="tutorial">'+
						 '<div class="tutorial-header">'+
					       '<img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/logo.png" ' +
					      		'style="vertical-align: bottom;" height="50px" alt="Simpatico">'+
					      		'<div style="display: inline-block;"><h1 style="margin: 0;">Simpatico</h1><span style="float:right;">TUTORIAL</span></div>'+
			      		 '</div>'+
			      		 '<div id="tutorialcontent"></div>' +
			      		 '<div id="tutorial-buttons">' +
			      		 '  <a id="tutorialesc" href="#">ESCI</a>' +
			      		 '  <a id="tutorialnext"  href="#">AVANTI</a>'+
			      		 '</div>' +
			      	   '</div>' +
					'</div>'
					).dialog({
						autoOpen: false,
						classes: {
							"ui-dialog": "tutorial-dialog"
						},
						modal: true,
						closeOnEscape: false,
						height: "auto",
						width: 500
			});
			dialog_tutorial.dialog('open');
			$('#tutorialesc').click(closeTutorial);
			$('#tutorialnext').click(nextTutorial);
			$('#tutorialcontent').html(tutorialContent(0));
		}, 500);
		localStorage.simpatico_tutorial_shown = true;
	}
}

function closeTutorial() {
	dialog_step = 0;
	dialog_tutorial.dialog('destroy');
}
function nextTutorial() {
	dialog_step++;
	$('#tutorialcontent').html(tutorialContent(dialog_step));
	if (dialog_step == 6) {
		$('#tutorialnext').hide();
	}
}
function tutorialContent(step) {
	switch(step) {
	case 0: return '<p>Il servizio SIMPATICO mette a disposizione strumenti per semplificare la compilazione dei moduli online.</p><br/><p>Per accedere alle funzionalità effettua l\'accesso in alto a destra.</p>';
	case 1: return '<table><tr><td><img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/forms.png"></td><td width="100%">La funzionalità COMPILAZIONE GUIDATA ti accompagna passo-passo nella compilazione del modulo online.</td></tr></table>';
	case 2: return '<table><tr><td><img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/citizenpedia.png"></td><td width="100%">La funzionalità DOMANDE E RISPOSTE ti permette di leggere e/o inserire domande legate a specifiche sezioni del servizio.</td></tr></table>';
	case 3: return '<table><tr><td><img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/enrich.png"></td><td width="100%">La funzionalità SEMPLIFICAZIONE TESTO mette a disposizione strumenti per meglio comprendere le frasi nel modulo. Per attivarla devi selezionare il testo da semplificare e cliccare sull\'icona.</td></tr></table>';
	case 4: return '<table><tr><td><img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/cdv.png"></td><td width="100%">La funzionalità DATI PERSONALI ti consente di salvare e recuperare in altri moduli le informazioni che hai inserito (es. nucleo familiare).</td></tr></table>';
	case 5: return '<table><tr><td><img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/diagram.png"></td><td width="100%">La funzionalità PROCEDURA ti permette di avere uno sguardo di insieme dei passi previsti per l’attivazione e l’utilizzo del servizio.</td></tr></table>';
	case 6: return '<table><tr><td><img src="https://simpatico.smartcommunitylab.it/simp-engines/wae/webdemo/img/feedback.png"></td><td width="100%">La funzione FEEDBACK ti consente di esprimere in ogni momento una valutazione rispetto alle funzionalità di SIMPATICO.</td></tr></table>';
	}
}
	