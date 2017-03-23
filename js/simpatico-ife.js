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
    endpoint: '', 
    clientID: '',
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
    endpoint: '',
    primaryColor: "#24BCDA",
    secondaryColor:"#D3F2F8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    questionsBoxClassName: "simp-ctz-ui-qb",
    questionsBoxTitle: "RELATED QUESTIONS",
    addQuestionLabel: "+ Add new question",
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
    endpoint: '',
    language: '',
    primaryColor: "#DE453E",
    secondaryColor:"#F0ABA8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    simplifyBoxClassName: "simp-tae-ui-sb",
    simplifyBoxTitle: "Simplified text",
    wordPropertiesClassName: "simp-tae-ui-word"
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
                  id: "simp-bar-sw-tae",
                  // Ad-hoc images to define the enabled/disabled images
                  imageSrcEnabled: "./img/simplify.png",
                  imageSrcDisabled: "./img/simplify.png",
                  alt: "Text simplification",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-tae",
                  styleClassDisabled: "simp-bar-btn-inactive-tae",

                  isEnabled: function() { return taeUI.getInstance().isEnabled(); },
                  enable: function() { taeUI.getInstance().enable(); },
                  disable: function() { taeUI.getInstance().disable(); }
                }
            ];
}//initFeatures()

// It creates the HTML code corresponding to the button passed as parameter
// - button: The button object stored in buttons
function createButtonHTML(button) {
  return '<li class="'+ button.styleClassDisabled +'" id="' + button.id + '" '+
                          'onclick="toggleAction(\'' + button.id + '\');">'+
                          //'<a href="#">' +
                          '<img ' +
                            'alt="' + button.alt + '" ' + 
                            'title="' + button.alt + '" ' +
                            'id="' + button.id + '-img" ' +
                            'src="' + button.imageSrcDisabled + '" ' +
                            'width="50" height="50" />' +
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
  // Update the login button status
  var loginButton = document.getElementById(buttons[0].id);
  loginButton.childNodes[0].src = buttons[0].imageSrcEnabled;
  
  // For each button (without the login one) create and add the node
  var buttonsContainer = document.getElementById("simp-bar-container-left");
  for (var i = 1, len = buttons.length; i < len; i++) {
    buttonsContainer.appendChild(createButtonNode(buttons[i]), loginButton);
  }
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
                                'alt="Simpatico">' +
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
  var clickedButon;
  // Disable all the buttons
  for (var i = 1, len = buttons.length; i < len; i++) {
    if(buttons[i].id == id && !buttons[i].isEnabled()) {
      clickedButon = buttons[i];
    } else {
      buttons[i].disable();
      updateButtonStyle(buttons[i]);
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
});