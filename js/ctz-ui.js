// Citizenpedia User Interface (ctz-ui.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the functionality related to the User Interface
// which enriches the Interactive Front-End component with the features of 
// the Citizenpedia component.
// - It uses the methods implemented in ctz-core.js
// - The Citizenpedia server side code is available in:
//              https://github.com/SIMPATICOProject/Citizenpedia
//-----------------------------------------------------------------------------

var citizenpediaUI = (function () {
  var instance; // Singleton Instance of the UI component
  var featureEnabled = false;
  function Singleton () {
    // Component-related variables
    var primaryColor = '';
    var secondaryColor = '';
    var elementsToEnhanceClassName = '';
    var questionsBoxTitle = '';
    var questionsBoxTitleClassName = '';
    var questionsBoxClassName = '';
    var addQuestionLabel = '';

    // Internal usage variables
    var paragraphs = []; // Used to store all the tagged paragraphs
    var originalStyles = []; // Used to store the tagged paragraphs CSSstyles

    // Component-related methods and behaviour
    function initComponent(parameters) {
      primaryColor = parameters.primaryColor;
      secondaryColor = parameters.secondaryColor;
      elementsToEnhanceClassName = parameters.elementsToEnhanceClassName;
      questionsBoxTitle = parameters.questionsBoxTitle;
      questionsBoxClassName = parameters.questionsBoxClassName;
      addQuestionLabel = parameters.addQuestionLabel;
      qaeCORE.getInstance().init({
          endpoint: parameters.endpoint
        });
    }
    
    function enableComponentFeatures() {
      if (featureEnabled) return;
      featureEnabled = true;

      // Gets the tagged paragraphs the first time
      if (paragraphs.length === 0) {
        paragraphs = document.getElementsByClassName(elementsToEnhanceClassName);
      }

      // Add special format and add a couple of attributes to the paragraphs
      var paragrapId = 1;
      var paragraphName = '';
      for (var i = 0, len = paragraphs.length; i < len; i++) {
        // Store original style
        originalStyles[i] = paragraphs[i].style;

        // Add the enhanced paragraph style
        paragraphName = "Paragraph" + paragrapId;
        paragraphs[i].style.position = 'relative';
        paragraphs[i].style.borderLeft = ".75em solid " + primaryColor;
        paragraphs[i].style.borderRadius = "1em";

        paragraphs[i].style.padding = '0em 0em 0em .5em';
        paragraphs[i].style.margin = '0em 0em .5em 0em';

        paragraphs[i].setAttribute("id", paragraphName);
        // Add the onclick event to enhance the paragraph
        paragraphs[i].setAttribute("onclick", 
          "citizenpediaUI.getInstance()." + 
          "paragraphEvent('" + paragraphName + "');");
        paragrapId++;
      }
    }
  
    function disableComponentFeatures() {
      if (!featureEnabled) return;
      featureEnabled = false;

      // Remove Question Boxes
      var questionsBoxes = document.getElementsByClassName(questionsBoxClassName);
      for (var i = questionsBoxes.length - 1; i >= 0; i--) {
        questionsBoxes[i].parentNode.removeChild(questionsBoxes[i]);
      }
      
      // Reformat the paragraphs with the original style
      for (var i = 0, len = paragraphs.length; i < len; i++) {
        // Restore the original style
        paragraphs[i].style = originalStyles[i];
        // Remove the onclick event to enhance the paragraph
        paragraphs[i].removeAttribute("onclick");
      }
    }

    // If the Component feature is enabled it calls to the Citizenpedia instance to 
    // get the questions related to the paragraph passed as parameter
    // - paragraphName: the id of the paragraph which has produced the event
    // IMPORTANT: Here is used the global variable simpaticoEservice
    function paragraphEvent(paragraphName) {
      if (!featureEnabled) return;
      if (document.getElementById(paragraphName + "_questions") === null) {
        qaeCORE.getInstance().getQuestions(simpaticoEservice, paragraphName, drawQuestionsBox);
      } else {
        hideQuestionsBox(paragraphName);
      }
    }
    
    // Draw the questions box
    // - paragraphName: the id of the paragraph
    // - responseQuestions: the JSON Object of the questions related to the paragraph
    // IMPORTANT: Here is used the global variable simpaticoEservice
    function drawQuestionsBox(paragraphName, responseQuestions) {

      // Create the Questions Box div
      var questionsBox = document.createElement('div');
      questionsBox.id = paragraphName + "_questions";
      questionsBox.className = questionsBoxClassName;
      
      // 1. the title is attached 
      var questionsHtml = '<p>' + questionsBoxTitle + '</p>';

      // 2. a list containing the made questions is attached
      questionsHtml += '<ul>';

      // 2.a. for each question a new bulletpoint is made 
      for (var i = 0, len = responseQuestions.length; i < len; i++) {
        questionsHtml += '<li onclick="cancelClick(event);">' + 
                            '<a href="' + 
                                qaeCORE.getInstance().createQuestionDetailsURL(
                                  responseQuestions[i]._id) + 
                                '">' + responseQuestions[i].title + 
                            '</a>' +
                         '</li>';
      }

      // 2.b. finally the Add Question link is also attached 
      questionsHtml += '<li onclick="cancelClick(event);">'
      questionsHtml +=    '<a href="' + 
                                qaeCORE.getInstance().createNewQuestionURL(
                                  "Benestar", // TO-DO: Remove the hardcoded element
                                  simpaticoEservice,
                                  paragraphName, 
                                  document.getElementById(paragraphName).textContent) + 
                                '">' + addQuestionLabel + 
                          '</a>'
      questionsHtml += '</li>';
      
      questionsHtml += '</ul>';

      questionsBox.innerHTML = questionsHtml;
      document.getElementById(paragraphName).appendChild(questionsBox);
    } //drawQuestionsBox

    // Hide the questions box attached to a paragraph passed as paramether
    // - paragraphName: the id of the paragraph
    function hideQuestionsBox(paragraphName) {
      var qBoxToRemove = document.getElementById(paragraphName + "_questions");
      qBoxToRemove.parentNode.removeChild(qBoxToRemove);
    }

    return {
      // Public definitions
      init: initComponent, // Called only one time
      enable: enableComponentFeatures,  // Called when the Component button is enabled
      disable: disableComponentFeatures, // Called when the Component button is disabled or another one enabled
      isEnabled: function() { return featureEnabled;}, // Returns if the feature is enabled
      
      paragraphEvent: paragraphEvent
    };
  }
  
  return {
    getInstance: function() {
      if(!instance) instance = Singleton();
      return instance;
    }
  };
})();