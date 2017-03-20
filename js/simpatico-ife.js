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
  // - authority: the used authentication mechanism
  authManager.getInstance().init({
    endpoint: 'http://localhost:8080/aac', 
    clientID: '33c10bee-136b-463c-8b9d-ad21d82182db',
    authority: "google"
  });

  // Init the Citizenpedia component (see ctz-ui.js)
  // - endpoint: the main URL of the used Citizenpedia instance
  // - primaryColor: Color used to highlight the enhanced components
  // - secondaryColor: Color used to paint the question boxes backgrounds
  // - elementsToEnhanceClassName: The CSS class used to define the enhanced elements
  // - questionsBoxClassName: The CSS class of the box which shows questions
  // - questionsBoxTitle: Title of the box hwich shows questions
  // - addQuestionLabel: Text exposed to show the action to create a question
  citizenpediaUI.getInstance().init({
    endpoint: 'http://localhost:8080/IFE/index_demo.html',
    primaryColor: "#24BCDA",
    secondaryColor:"#D3F2F8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    questionsBoxClassName: "simp-ctz-ui-qb",
    questionsBoxTitle: "RELATED QUESTIONS",
    addQuestionLabel: "+ Add new question",
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
    endpoint: 'http://localhost:8080',
    serviceID: '2',
	serviceURL: 'http://localhost:8080/IFE/index_demo.html',
	dataFields:["AventeTitolo_EMailPEC","AventeTitolo_Fax","AventeTitolo_EMail"], 
    cdvColor: '#008000',
	dialogTitle: 'Citizen Data Vault',
    tabPFieldsTitle: 'My Data'
  });
  

 
  // Declare here the buttons that will be available in the Simpatico Bar
  // The first one is the login button. This is mandatory but it also can be personalised
  // Options available:
  buttons = [{
                  id: "simp-bar-sw-login",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "./img/ic_on.png",
                  imageSrcDisabled: "./img/login.png",
                  alt: "Autheticate",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-none", 
                  styleClassDisabled: "simp-none",
                  
                  isEnabled: function() { return authManager.getInstance().isEnabled(); },
                  enable: function() { authManager.getInstance().enable(); },
                  disable: function() { authManager.getInstance().disable(); }
                },

                {
                  id: "simp-bar-sw-citizenpedia",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "./img/citizenpedia.png",
                  imageSrcDisabled: "./img/citizenpedia.png",
                  alt: "Questions and answer",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return citizenpediaUI.getInstance().isEnabled(); },
                  enable: function() { citizenpediaUI.getInstance().enable(); },
                  disable: function() { citizenpediaUI.getInstance().disable(); }
                },

                {
                  id: "simp-bar-sw-cdv",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "./img/cdv.png",
                  imageSrcDisabled: "./img/cdv.png",
                  alt: "Citizen Data Vault",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-cdv",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return cdvUI.getInstance().isEnabled(); },
                  enable: function() { cdvUI.getInstance().enable(); },
                  disable: function() { cdvUI.getInstance().disable(); }
                }
				
            ];
}//initFeatures()

// It creates the HTML code corresponding to the button passed as parameter
// - button: The button object stored in buttons
function createButtonHTML(button) {
  return '<li class="'+ button.styleClassDisabled +'" id="' + button.id + '" '+
                          'onclick="toggleAction(\'' + button.id + '\');">'+
                          //'<a href="#">' +
                          '<img alt="' + button.alt + '" ' + 
                            'id="' + button.id + '-img" ' +
                            'src="' + button.imageSrcDisabled + '" ' +
                            'width="50" height="50" ' + 
			                'title="' + button.alt + '" ' +
                            'alt="submit"/>' +
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
  console.log(">>> enablePrivateFeatures()");

  // Update the login button status
  var loginButton = document.getElementById(buttons[0].id);
  loginButton.childNodes[0].src = buttons[0].imageSrcEnabled;
  
  // For each button (without the login one) create and add the node
  var buttonsContainer = document.getElementById("simp-bar-container-left");
  for (var i = 1, len = buttons.length; i < len; i++) {
    buttonsContainer.appendChild(createButtonNode(buttons[i]), loginButton);
  }

  console.log("<<< enablePrivateFeatures(): " + buttonsContainer);
}//enablePrivateFeatures(id)

// It inits all the configured buttons
// Called one time
function disablePrivateFeatures() {
  console.log(">>> removeButtons()");

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

  console.log("<<< removeButtons()");
}//disablePrivateFeatures()

// It adds the Simpatico Toolbar inside the component of which id is passed 
// as parameter
// - containerID: the Id of the element which is going to contain the toolbar 
function addSimpaticoBar(containerID) {
  // Create the main div of the toolbar
  var simpaticoBarHtml = '<div id="simp-bar">' +
                            '<div>' +
                              '<a href="#">' +
                                '<img src="./img/logo.png" ' +
                                'height="50px" ' +
                                'alt="Simpatico ">' +
                              '</a>' +
                            '</div>';

  // Add the left side of the toolbar
  simpaticoBarHtml += '<ul id="simp-bar-container-left"></ul>';

  // Add the right side of the toolbar
  simpaticoBarHtml += '<ul id="simp-bar-container-right">' + 
                         '<li><span id="simp-usr-data"></span></li>' +
                          createButtonNode(buttons[0]).outerHTML +
                      '</ul>';

  // Close the main div
  simpaticoBarHtml += '</div>';

  // Add the generated bar to the container
  document.getElementById(containerID).innerHTML = simpaticoBarHtml;
}//addSimpaticoBar()

// switch on/off the control buttons.
// -id: of the button which calls this function
function toggleAction(id) {
  console.log(">>> toggleAction(" + id + ")");
  // For each button remove the node 
  for (var i = 0, len = buttons.length; i < len; i++) {
    if(buttons[i].id == id) {
      if (buttons[i].isEnabled()) {
		document.getElementById(buttons[i].id).classList.remove(buttons[i].styleClassEnabled);
        document.getElementById(buttons[i].id).classList.add(buttons[i].styleClassDisabled);
        buttons[i].disable();
      } else {
        document.getElementById(buttons[i].id).classList.remove(buttons[i].styleClassDisabled);
        document.getElementById(buttons[i].id).classList.add(buttons[i].styleClassEnabled);
        buttons[i].enable();
      }
    } 
  }
  console.log("<<< toggleAction(" + id + ")");
}//toggleAction(id)

// Once the document is loaded the Simpatico features are initialised and the 
// toolbar added
document.addEventListener('DOMContentLoaded', function () {
  initFeatures();
  addSimpaticoBar("simpatico_top");
  authManager.getInstance().updateUserData();
});