# Interactive Front-End
The Interactive Front-End component (IFE) is the main component which dialogs with SIMPATICO users meanwhile they are interacting with a Public Administration e-service. Several features of the SIMPATICO platform could be selected and used through this component.
Features:
 - **Text Adaptation**: *Text simplification* of the paragraphs and of the text selected by the user and *terms definitions* 
 - **Citizen Data Vault**: Automatic *filling of forms* with the user own data
 - **Workflow Adaptation**: simplification and guidance for the form compilation
 - **Question and Answers Engine**: ask and *get questions* related to the enhanced e-service
 - **Collaborative Process Design**: get a *diagram describing* the corresponding e-service

IFE is a group of JavaScript libraries that runs in a web browser and enables to apply the simpatico enhancement features over the existing electronic services.

## Content
- [1. Usage](#1-usage)
- [2. Instrumenting E-service Web Page.](#2-instrumenting-e-service-web-page)
- [3. Configuring IFE Components](#3-configuring-ife-components)
- [4. Pilot Examples and Test Execution](#4-pilot-examples-and-test-execution)
- [5. Development of a new feature](#5-development-of-a-new-feature)

## 1. Usage 
In order to use Interactive Front-End, JS Libraries should be loaded and configured in each enhanced webpage.
Depending of the features, different JS Libraries should be selected.

| File | Feature | Mandatory | Required Component | Description |
| :--- | :--- | :---: | :---: | :--- |
|  *simpatico-auth.js* | **Authentication**  | Yes | [AAC](https://github.com/SIMPATICOProject/aac) |The Authentication and Authorization Control Module client connected to the SIMPATICO **AAC** module |
|  *log-core.js* | **Logging**  | Yes | [LOG](https://github.com/SIMPATICOProject/logs) |The logging component connected to the SIMPATICO **LOG** module |
| *ctz-ui.js* and *ctz-core.js* | **Questions and Diagrams**  | No | [Citizenpedia](https://github.com/SIMPATICOProject/citizenpedia)  | The Citizenpedia Component client which exposes questions related to the e-service, it enables users to ask new ones and search a diagram which represents the current e-service |
| *tae-ui.js* and *tae-core.js* / *tae-ui-popup.js* and *tae-core-popup.js* | **Text Adaptation**  | No | [TAE/WAE](https://github.com/SIMPATICOProject/simpatico-adaptation-engines)  | The Text Adaptation Engine Component client which exposes text simplifications and complex words definitions and synonyms to ease the e-service understanding  |
| *wae-ui.js* and *wae-core.js* | **Workflow Adaptation**  | No | [TAE/WAE](https://github.com/SIMPATICOProject/simpatico-adaptation-engines)  | The Workflow Adaptation Engine Component client which exposes the workflow simplification and adaptation functionality  |
| *cdv-ui-popup.js* and *cdv-core-popup.js* | **Citizen Data Vault**  | No | [CDV](https://github.com/SIMPATICOProject/CDV)  | The UI components for populating and reading the user personal data from Citizen Data Vault  |

The integration and configuration of these components is specific to the deployment environment. Basic setup 
consists of instrumenting a SIMPATICO toolbar, where the access to the SIMPATICO instruments is 
granted to the authenticated users. See the pilot-specific examples on how the tools and toolbars
are constructed. These examples configure the components and toolbars via ``simpatico-ife.js`` script.

In order to integrate IFE into a e-service Web page, the following steps should be performed:
- install and configure the platform components required by IFE (see the table above);
- instrument the e-service Web page with the scripts/style files in order to enable and configure the SIMPATICO toolbar;
- configure the modules used bt the SIMPATICO toolbar: LOG, AUTH, TAE, WAE, CDV, Citizenpedia.

## 2. Instrumenting E-service Web Page.

### Injection of JS Libraries
TO enable SIMPATICO toolbar for a specific e-service, the Web page of the e-service should include the reference 
to the SIMPATICO JavaScript libraries according to the table defined above. For example: 

```html
    <script src="js/log-core.js"></script>
    <script src="js/ctz-ui.js"></script>
    <script src="js/ctz-core.js"></script>
    <script src="js/cdv-ui-popup.js"></script>
    <script src="js/cdv-core-popup.js"></script>
    <script src="js/tae-core.js"></script>
    <script src="js/tae-ui.js"></script>
    <script src="js/wae-core.js"></script>
    <script src="js/wae-ui.js"></script>

    <script src="js/tae-core-popup.js"></script>
    <script src="js/tae-ui-popup.js"></script>

    <script src="js/sf-core.js"></script>
    <script src="js/sf-ui.js"></script>

    <script src="js/simpatico-auth.js"></script>

    <script src="js/simpatico-ife.js"></script>
```

Additionally, it is possible to include and customize the CSS styles for the Simpatico toolbar and its instruments:

```html
    <link rel="stylesheet" href="css/simpatico.css"/>
```

### Global variables

SIMPATICO tools rely on a set of globally available variables that defines properties specific to the current e-service Web page.
These properties include:

* **simpaticoEservice** (required): It contains the unique id of the enhanced e-service. It is the identifier used by CDV and Citizenpedia.
* **simpaticoForm** (optional): It contains the unique identifier of the form of a e-service that the user is expected to fill in on the current
page. If the page does not contain the form, the variable should be omitted. The value is used to log FORM START event upon the page initialization.
* **simpaticoCategory** (optional): It contains the general category of the enhanced e-service. It is used by the Citizenpedia client.
Example:
```html
  <script type="text/javascript">
    var simpaticoEservice = "BS607A"; //  the id corresponding to the e-service
    var simpaticoForm = "main";
    var simpaticoCategory = "Wellness"; // the general category of the e-service
  </script>
```

### Customize Toolbar

The toolbar, its appearance and functionality is defined in *simpatico-ife.js* JavaScript. This script configures individual modules, 
defines the toolbar itself, and defines the behavior of the toolbar buttons.  To change the default behavior, it is possible to
change this script. In particular, it is possible to define which components should be activated, how the toolbar appears, etc.

## 3. Configuring IFE Components

The configuration of IFE modules is performed within the [simpatico-ife.js](https://github.com/SIMPATICOProject/IFE/blob/master/js/simpatico-ife.js) file.

### Configure Authentication

The AAC module should be already installed and available over Internet. It is also necessary to configure the OAuth2.0 client
with the implicit (browser) flow enabled and redirect URI defined.

To configure AAC in IFE it is necessary to define the properties of the authManager module:

```JavaScript
  authManager.getInstance().init({
    endpoint: 'https://the-aac-instance-endpoint.com', 
    clientID: 'A0A0A0A0-A0A0-A0A0-A0A0-A0A0A0A0A0A0',
    authority: "google",
    redirect: 'https://my-callback-endpoint.com/',
    greeting: 'ACCESS SIMPATICO TOOLS'
  });
```
Parameters:
* **endpoint**: the main URL of the used AAC instance.
* **clientID**: the IFE Client ID registered in the AAC instance
* **authority**: the used authentication mechanism. If not specified, the authority (authorities) will be taken from the AAC client configuration.
* **redirect**: (optional, defaults to /IFE/login.html) the page to which AAC redirects upon successful integration. Please note that IFE expects 
the redirect page to contain the scripts which communicates the OAuth2.0 token information upon success. See [login.html](https://github.com/SIMPATICOProject/IFE/blob/master/login.html)
page for details.
* **greeting**: a string to invite the user to signin.

**IMPORTANT!** For the Authentication to work correctly under IE 10/11, it is necessary that the redirect page is **IN THE SAME DOMAIN** the e-service page is. The
code of the redirect page should reflect the one found in [login.html](https://github.com/SIMPATICOProject/IFE/blob/master/login.html). 

### Configure Logging

The logging component is used by all the other IFE modules in order to log the relevant interaction events. It should be already installed
and made available over Internet.

To configure the LOG component it is necessary to setup the logCORE module:
```JavaScript
  logCORE.getInstance().init({
    endpoint: "https://the-logs-endpoint.com/simpatico/api",
    testMode: false
  });
```
Parameters:
* **endpoint**: the main URL of the used LOG instance, pointing to the API path.
* **testMode**: set to true if you want to avoid the log messages being sent to the server (defaults to false).

### Configure Question and Answer Module (Citizenpedia)

The citizenpedia IFE module requires the citizenpedia component already installed and made available over Internet.

To configure the Citizenpedia component it is necessary to setup the citizenpediaUI module:
```JavaScript
  citizenpediaUI.getInstance().init({
    endpoint: 'https://the-citizenpedia-instance-endpoint.com'
    cpdDiagramEndpoint: 'https://the-cpd-instance-endpoint.com/cpd/api/diagram/eService',
    primaryColor: "#24BCDA",
    secondaryColor:"#D3F2F8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    questionsBoxClassName: "simp-ctz-ui-qb",
    questionsBoxTitle: "RELATED QUESTIONS",
    addQuestionLabel: "+ Add new question",
    diagramNotificationImage: "./img/diagram.png",
    diagramNotificationClassName: "simp-ctz-ui-diagram",
    diagramNotificationText: "There is one diagram related to this e-service in Citizenpedia",
    questionSelectionFilters: ['h1', '.h2']
  });
```
Parameters:
* **endpoint**: the main URL of the used Citizenpedia instance
* **cpdDiagramEndpont**: the endpoint of the
CPD API service with the diagram eService data. Normally refers to the CPD endpoint with the context path ``/cpd/api/diagram/eService``.
* **primaryColor**: color used to highlight the enhanced components
* **secondaryColor**: color used to paint the question boxes backgrounds
* **elementsToEnhanceClassName**: the CSS class used to define the enhanced elements
* **questionsBoxClassName**: the CSS class of the box which shows questions
* **questionsBoxTitle**: title of the box which shows questions
* **addQuestionLabel**: text exposed to show the action to create a question
* **diagramNotificationImage**: Image to show when a diagram is found
* **diagramNotificationClassName**: The CSS class of the img shown when a diagram is found
* **diagramNotificationText**: The text to notify that a diagram
* **questionSelectionFilters**: optional jQuery selectors used by QAE library to extract the data for the question. That is if the HTML block annotated with the ``questionsBoxClassName`` class contains a lot of sub-elements, it is possible to restrict only to those that match the specified selectors.

### Configure Text Adaptation Engine Module

The TAE IFE module requires the TAE/WAE component already installed and made available over Internet.

TAE module come with the UI in two flavours, for the simplification of pre-annotated paragraph/phrases and for
the simplification of the text/words directly selected by the user (popup mode).

To configure the TAE component it is necessary to setup the taeUI or taeUIPopup modules:

```JavaScript
  taeUI.getInstance().init({
    endpoint: 'https://the-tae-instance-endpoint.com/simp-engines/tae',
    language: 'it',
    primaryColor: "#DE453E",
    secondaryColor:"#F0ABA8",
    elementsToEnhanceClassName: "simp-text-paragraph",
    simplifyBoxClassName: "simp-tae-ui-sb",
    simplifyBoxTitle: "Simplified text",
    wordPropertiesClassName: "simp-tae-ui-word",
    synonymLabel: "Synonyms",
    definitionLabel: 'Definitions',
  	emptyText: 'No simplifications found for this text'
  });
```
Parameters:
* **endpoint**: the main URL of the used TAE instance
* **language**: the language of the text to be adapted by the TAE instance
* **primaryColor**: Color used to highlight the enhanced components
* **secondaryColor**: Color used to paint the simplification boxes backgrounds
* **elementsToEnhanceClassName**: The CSS class used to define the enhanced elements
* **simplifyBoxClassName**: The CSS class of the box which shows the simplifications
* **simplifyBoxTitle**: Title of the box which shows the simplifications
* **wordPropertiesClassName**: The CSS class of the word properties box
* **synonymLabel**: label for 'synonyms' block
* **definitionLabel**: label for 'definitions' block
* **emptyText**: text to show in case of no simplifications provided.  

```JavaScript
  taeUIPopup.getInstance().init({
		lang: 'it',
		endpoint: 'https://the-tae-instance-endpoint.com/simp-engines/tae',
		dialogTitle: 'Text enrichment',
		tabDefinitionsTitle: 'Definitions',
		tabSimplificationTitle: 'Simplifications',
		tabWikipediaTitle: 'Wikipedia',
		entryMessage: 'Select a tool',
		notextMessage: 'No text selected'
	});
```
Parameters:
* **endpoint**: the main URL of the used TAE instance
* **lang**: the language of the text to be adapted by the TAE instance
* **dialogTitle**: title of the popup dialog
* **tabDefinitionsTitle**: title of the Definitions tab of the popup dialog
* **tabSimplificationTitle**: title of the Simplification tab of the popup dialog
* **tabWikipediaTitle**: title of the Wikipedia tab of the popup dialog
* **entryMessage**: text for the initial tooltip in the dialog
* **notextMessage**: text for the tooltip in case no text selected


### Configure Workflow Adaptation Engine Module

The WAE IFE module requires the TAE/WAE component already installed and made available over Internet.

To configure the WAE component it is necessary to setup waeUI module:
```JavaScript
  waeUI.getInstance().init({
		lang: 'en',
		endpoint: 'https://he-wae-instance-endpoint.com/simp-engines/wae',
		prevButtonLabel: 'Previous',
		nextButtonLabel: 'Next',
		lastButtonLabel: 'Done',
		descriptionLabel: 'Description',
		topBarHeight: 60,
		errorLabel: {
      'block1' : 'Phone number is required'
    }
  });
```
Parameters:
* **lang**: the language of the text to be adapted by the WAE instance
* **endpoint**: the main URL of the used WAE instance
* **prevButtonLabel**: Label for 'previous step' button
* **nextButtonLabel**: Label for 'next step' button
* **lastButtonLabel**: Label for 'last step' button
* **descriptionLabel**: Label for 'description' block header
* **topBarHeight**: height of the bar to control the scroll
* **errorLabel**:  error messages for the adapted workflow blocks, if available on the page.

Please note that the module requires that the corresponding workflow has been uploaded to the WAE repository. The example of the
workflow model for the [index_demo.html](https://github.com/SIMPATICOProject/IFE/blob/master/index_demo.html) page can be found in 
[waemodel.json](https://github.com/SIMPATICOProject/IFE/blob/master/data/waemodel.json). To upload the model to the repository
it is necessary to use the following [API method](https://dev.smartcommunitylab.it/simp-engines/swagger-ui.html#!/wae-controller/addModelStoreUsingPOST).

The URI of the workflow model is configured directly in the page as an **data-simpatico-workflow** attribute of the enclosing HTML tag, e.g.,
```HTML
<form data-simpatico-workflow="indexdemo" ...>
...
</form>
```

**IMPORTANT!** WAE library relies on the XPath API of the browser, which is not available on IE 10/11. To make it work, the following JS and code
should be included in the page together with the other JavaScript dependencies:

```HTML
    <script src="https://github.com/google/wicked-good-xpath/releases/download/1.3.0/wgxpath.install.js"></script>
    <script>
        wgxpath.install();
    </script>
```

### Configure Citizen Data Vault Module

The CDV IFE module requires the CDV components already installed and made available over Internet.

To configure the CDV component it is necessary to setup cdvUI module:
```JavaScript
  cdvUI.getInstance().init({
    endpoint: 'https://cdv-domain.com/CDV',
    serviceID: simpaticoEservice,
	serviceName: "MY Service Name",
    serviceURL: "https://service-page-domain.com/path/to/e-service",
    dataFields: simpaticoMapping,
    informedConsentLink: "https://page-with-privacy-consent-domain.com/path/to/informed_consent.html",
    cdvColor: '#008000',
    dialogTitle: 'Personal data',
    entryMessage: 'Personal data management',
    statusMessage: 'Now you can use your personal data to fill in the fields highlighted in green. Use the values saved previsously or add new values.',
    dialogSaveTitle: 'Data saved',
    dialogSaveMessage: 'Your personal data has been correctly saved.',
    statusMessageNoAccount: "No personal account has been associated. Create one?",
    statusMessageNoActive: "Personal data management is not active. Activate it now?",
    confirmSaveDataMessage: "Do you want to update your personal data?",
    buttonSaveData:"Save your data",
    buttonManageData:"Manage your data",
    buttonActivate:"Activate",
    buttonCreate: "Create",
    consentButton: "Accept",
    cdvDashUrl:'https://cdv-domain.com/CDV/cdv-dashboard/index.html'
  });
```
Parameters:
* **endpoint**: the main URL of the used CDV instance
* **serviceID**: id of the e-service (refers to the global variable)  
* **dataFields**: fields to process with autocompletion (refers to the global variable)
* **informedConsentLink**: page with the privacy policy explanations.
* **cdvColor**: color to use for highlighting the fields
* **dialogTitle**: title of the popup
* **entryMessage**: Entry message
* **statusMessage**: message that the CDV is enabled for the user for the service
* **dialogSaveTitle**: Title for 'Data saved' notification,
* **dialogSaveMessage**: Text for 'Data saved' notification,
* **statusMessageNoAccount**: Message to show when no CDV account has been created yet,
* **statusMessageNoActive**: Message to show when no CDV account has been activated yet,
* **confirmSaveDataMessage**: Message for 'save data' confirmation dialog,
* **buttonSaveData**: Label for save data button,
* **buttonManageData**: Label for manage data button,
* **buttonActivate** :Label for activate account button,
* **buttonCreate**: Label for create account button,
* **consentButton**: Message for accept privacy consent button,
* **cdvDashUrl**: link to the CVD dashboard page.

### Configure Session Feedback Module

The SF IFE module requires the LOG components already installed and made available over Internet.

To configure the SF component it is necessary to setup cdvUI module:
```JavaScript
  sfUI.getInstance().init({
    buttonToShowSfId: 'Save',
    apiEndpoint: 'http://localhost:8080/simpatico/logs',
    formSelector: 'form',
    listener: function() {
    	$('form').submit();
    },
  });
```
Parameters:
* **buttonToShowSfId**: the button/link upon which the popup shoud appear. If the session feedback popup should appear in differnt mode,
it is possible to use ` sfUI.getInstance().showSF()` method.
* **apiEndpoint**: endpoint of the LOG component to log data to
* **formSelector**: reference to the form that is submitted
* **listener**: function to invoke upon SF user action (cancel or submit). 

Note that to configure SF it is necessary to attach the operation either to some 'complete' button or to the form representing e-service form.
In the former case it is necessary to specify ``buttonToShowSfId`` value. If the form is validated and managed via form ``onsubmit`` property, the ``formSelector`` and ``listener`` should be specified. They will replace the original functionality with the one that shows additionally shows the SF form and the performs the submit.

### Buttons configuration

In order to personalise the look and feel of each feature button, the parameters of each one should be defined.

* **id**: the unique element id used to get the button inside the DOM
* **imageSrcEnabled**: the URL of the image shown when the button is enabled
* **imageSrcDisabled**: the URL of the image shown when the button is disabled
* **alt**: the alternative text of the button
* **styleClassEnabled**: the CSS class applied to the button shown when it is enabled
* **styleClassDisabled**: the CSS class applied to the button shown when it is disnabled,
* **isEnabled**: function that should return true if the corresponding component is currently activated
* **enable**: activate the component
* **disable**: de-activate the component:
* **text**: Label for the button

Example of the buttons configuration:
```JavaScript
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
                  disable: function() { authManager.getInstance().disable(); },
                  text: 'Sign In'
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
                  disable: function() { citizenpediaUI.getInstance().disable(); },
                  text: "Questions and Answers"
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
                },
                text: "Simplify"
                {
                    id: "simp-bar-sw-tae-popup",
                    // Ad-hoc images to define the enabled/disabled images
                    imageSrcEnabled: "./img/enrich.png",
                    imageSrcDisabled: "./img/enrich.png",
                    alt: "Semplificazione del testo selezionato",
                    // Ad-hoc css classes to define the enabled/disabled styles
                    styleClassEnabled: "simp-bar-btn-active-tae",
                    styleClassDisabled: "simp-bar-btn-inactive-tae",

                    isEnabled: function() { return taeUIPopup.getInstance().isEnabled(); },
                    enable: function() { 
                    	taeUIPopup.getInstance().showDialog(); 
                    },
                    disable: function() { 
                    	taeUIPopup.getInstance().hideDialog(); 
                    },
                    text: "Simplify (Popup)"
                },
                { // workflow adaptation. Switch to the modality, where the form adaptation starts
                  id: 'workflow',
                  imageSrcEnabled: "./img/forms.png",
                  imageSrcDisabled: "./img/forms.png",
                  alt: "Semplifica processo",
                  // Ad-hoc css classes to define the enabled/disabled styles
                  styleClassEnabled: "simp-bar-btn-active-wae",
                  styleClassDisabled: "simp-bar-btn-inactive",

                  isEnabled: function() { return waeUI.getInstance().isEnabled(); },
                  enable: function() { var idProfile = null; waeUI.getInstance().enable(idProfile); },
                  disable: function() { waeUI.getInstance().disable(); },
                  text: "Step by step compilation"
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
                  disable: function() { cdvUI.getInstance().disable(); ,
				          text: "Personal data"
                }
            ];
```

## 4. Pilot Examples and Test Execution

The example e-service pages with IFE configurations may be found in ``PILOT_*`` subfolders. To run the demos locally, the following steps should be performed:

1. Install the local server dependencies (from the root directory of the project):
```
  npm install
```
2. Run the local server 
```
  npm start
```
3. Open the demo page served at ``http://localhost:10001/``, for example: ``http://localhost:10001/PILOT_GALICIA/index.html``

Please note that some of the demo functionalities may fail due to CORS restrictions with respect to localhost domain.

## 5. Development of a new feature

In order to develope a new feature, two main JavaScrip Libraries should be created and implemented.
* **newfeature-ui.js**: JavaScript which contains the functionality related to the User Interface.
* **newfeature-core.js**: JavaScript which contains functions related to the main functionality (e.g. the server calls). It will be called by *newfeature-ui.js*

### Implementation of newfeature-ui.js

1. Implement the initComponent(parameters) function. To be completed...
2. Implement the enableComponentFeatures() function. To be completed...
3. Implement the disableComponentFeatures() function. To be completed...
4. Implement the public functions. To be completed...
5. Declare the public functions. To be completed...

UI-template:
```JavaScript
var newfeatureUI = (function () {
  var instance; // Singleton Instance
  var featureEnabled = false; // If the feature is enabled
  function Singleton () {
    // Component-related variables
    var myOwnVariable = '';

    //  [STEP1] Component-related methods and behaviour
    function initComponent(parameters) {
      // Init the Component-related variables
      myOwnVariable = parameters.myOwnVariable
      // Also init the corresponding CORE component
      newFeatureCORE.getInstance().init({
          endpoint: parameters.endpoint
        });
    }
    //  [STEP2] 
    function enableComponentFeatures() {
      if (featureEnabled) return;
      featureEnabled = true;
      // ...
      // Code of the new feature enabling (e.g. add onClick events to elements to do stuff)
    }
    //  [STEP3] 
    function disableComponentFeatures() {
      if (!featureEnabled) return;
      featureEnabled = false;
      // ...
      // Code of the new feature disabling (e.g. remove the added onClick events)
    }

    // [STEP4]
    function doStuff(element) {
      //...
    }

    return {
      // Mandatory definitions
      init: initComponent, // Called only one time
      enable: enableComponentFeatures,  // Called when the Component button is enabled
      disable: disableComponentFeatures, // Called when the Component button is disabled or another one enabled
      isEnabled: function() { return featureEnabled;}, // Returns if the feature is enabled
      // [STEP5] The ad-hoc functions
      doStuff: doStuff // Special public function
    };
  }
  
  return {
    getInstance: function() {
      if(!instance) instance = Singleton();
      return instance;
    }
  };
})();
```

### Implementation of newfeature-core.js
The var declared in this file is only used (it should not be used by another objects) in by the one declared in *newFeatureUI.js*, concretely, by newfeatureUI.

Taking the *CORE-template* template as a basis, the functions used in *newFeatureUI.js* should be implemented below the comment tagged as *[STEP1]* and declared below the comment tagged as *[STEP2]*

CORE-template:
```JavaScript
var newFeatureCORE = (function () {
  var instance;
  function Singleton () {
    // Component-related variables
    var endpointA = '';
    var endpointB = '';
    
    //In inits the main used variables (e.g. The URLs used)
    function initComponent(parameters) {
      endpointA = parameters.endpoint + '/A';
      endpointB = parameters.endpoint + '/B';
    }
    
    // [STEP2] Implementation
    function coreFunctionA() { // Do core stuff }
    function coreFunctionB() { // Do core stuff }

    return {
        // [STEP1] Functions used in newFeatureUI 
        init: initComponent,
        coreFunctionA: coreFunctionA,
        coreFunctionB: coreFunctionB
      };
  }  
  return {
    getInstance: function() {
      if(!instance) instance = Singleton();
      return instance;
    }
  };
})();

```




