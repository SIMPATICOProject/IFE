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
    var questionsBoxTitle = '';
    var addQuestionLabel = '';

    // Internal usage variables
    var paragraphs = []; // Used to store all the tagged paragraphs

    // Component-related methods and behaviour
    function initComponent(parameters) {
      primaryColor = parameters.primaryColor;
      secondaryColor = parameters.secondaryColor;
      questionsBoxTitle = parameters.questionsBoxTitle;
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
        paragraphs = document.getElementsByClassName("simp-text-paragraph");
      }

      // Add special format and add a couple of attributes to the paragraphs
      var paragrapId = 1;
      var paragraphName = '';
      for (var i = 0, len = paragraphs.length; i < len; i++) {
        paragraphName = "Paragraph" + paragrapId;
        paragraphs[i].style.position = 'relative';
        paragraphs[i].style.borderLeft = "thick solid " + primaryColor;
        paragraphs[i].setAttribute("id", paragraphName);
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
      var questionDivs = document.getElementsByClassName("citizenpedia_questions");
      for (var i = questionDivs.length - 1; i >= 0; i--) {
        questionDivs[i].parentNode.removeChild(questionDivs[i]);
      }
      
      // Reformat the paragraphs
      for (var i = 0, len = paragraphs.length; i < len; i++) {
        paragraphs[i].style.borderLeft = "none";
        paragraphs[i].removeAttribute("onclick");
      }
    }

    // If the Component feature is enabled it calls to the Citizenpedia instance to 
    // get the questions related to the paragraph passed as parameter
    // - paragraphName: the id of the paragraph which has produced the event
    // IMPORTANT: Here is used the golbal variable simpaticoEservice
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
    function drawQuestionsBox(paragraphName, responseQuestions) {
      // Create questions div
      var questionsDiv = document.createElement('div');
      questionsDiv.id = paragraphName + "_questions";
      questionsDiv.className = "citizenpedia_questions";
      questionsDiv.style.borderLeft = "thick solid " + primaryColor;
      questionsDiv.style.borderTop = "thick solid " + primaryColor;
      questionsDiv.style.backgroundColor = secondaryColor;
      
      // 1. the title is attached 
      questionsHtml = '<p ' +   
                      'style="font-weight: bold; ' +
                        'color: WHITE; ' +
                        'background-color:' + primaryColor + '; ' +
                        'margin-left:0px; ' +
                        'margin-right:0px"' +    
                      'id="ctz-ui-qb-title">' +    
                      questionsBoxTitle +
                      '</p>';

      // 2. A list containing the made questions is attached
      questionsHtml += '<ul>';

      // 2.a. For each question a new bulletpoint is made 
      for (var i = 0, len = responseQuestions.length; i < len; i++) {
        questionsHtml += '<li onclick="cancelClick(event);">' + 
                            '<a href="' + 
                                qaeCORE.getInstance().createQuestionDetailsURL(
                                  responseQuestions[i]._id) + 
                                '">' + responseQuestions[i].title + 
                            '</a>' +
                         '</li>';
      }

console.log("NAME=" + paragraphName + "");

      // 2.b. Finally the Add Question link is also attached 
      questionsHtml += '<li onclick="cancelClick(event);">'
      questionsHtml +=    '<a href="' + 
                                qaeCORE.getInstance().createNewQuestionURL(
                                  "Benestar", 
                                  simpaticoEservice,
                                  paragraphName, 
                                  document.getElementById(paragraphName).textContent) + 
                                '">' + addQuestionLabel + 
                          '</a>'
      questionsHtml += '</li>';
      
      questionsHtml += '</ul>';

      questionsDiv.innerHTML = questionsHtml;
      document.getElementById(paragraphName).appendChild(questionsDiv);
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
    // Public methods shoudl be used 
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