// Citizenpedia User Interface (ctz-ui.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the functionality related to the User Interface
// which enriches the Interactive Front-End component with the features of 
// the Citizenpedia component.
// - It uses the methods implemented in ctz-core.js.
// - All this methods are related to the feature/button named 'citizenpedia' 
//   in the buttons variable (see simpatico-ife.js code)
// - IMPORTANT: The citizenpediaURL variable should be declared.
//      Example: https://simpatico.morelab.deusto.es/citizenpedia
//-----------------------------------------------------------------------------

// This is the main URL of the used Citizenpedia instance 
var citizenpediaURL = 'https://my-citizenpedia-instace.com';

// Label for the "Related Questions" box
var questionsBoxTitle = "RELATED QUESTIONS";
var addQuestionLabel = "+ Add new question";
var questionListBackgroundColor = "#D3F2F8";

var paragraphs =[];
var questionsHtml;
var isCitizenpediaEnabled = false;


// This is the main function called by the corresponding button of the toolbar
// It enables or disables the Citizenpedia feature
function switchcitizenpedia()
{
  if (!isCitizenpediaEnabled) {
    enableCitizenpedia();
    isCitizenpediaEnabled = true;
  } else {
    disableCitizenpedia();
    isCitizenpediaEnabled = false;
  }
}

// It gets the tagged paragraphs and enhances them with the Citizenpedia features 
function enableCitizenpedia()
{
  functionColor = getFunctionColor("citizenpedia");
  functionColor = "#24BCDA"

  // 
  if (document.getElementById('citizenpediaSwitch').value == "citizenpediaOn") {
      switchFunction("citizenpedia");
  }

  // Gets the tagged paragraphs the first time
  if (paragraphs.length === 0) {
    paragraphs = document.getElementsByClassName("simp-text-paragraph");
  }

  // Add special format to the paragraphs
  var paragrapId = 1;
  for (var i = 0, len = paragraphs.length; i < len; i++) {
    paragraphs[i].setAttribute("id", "Paragraph" + paragrapId);
    var paragraph = document.getElementById(paragraphs[i].id);
    var paragraphName = paragraphs[i].id;
    paragraphs[i].style.position = 'relative';
    paragraphs[i].setAttribute("onclick", "citizenpedia('" + paragraphName + "');");
    paragraphs[i].style.borderLeft = "thick solid " + functionColor;
    paragrapId++;
  }
}

// It removes the Citizenpedia features of the tagged paragraphs
function disableCitizenpedia()
{
  // Remove Question Boxes
  var questionDivs = document.getElementsByClassName("citizenpedia_questions");
  if (questionDivs.length > 0) {
    for (var i = 0; i <= questionDivs.length; i++) {
      document.getElementById(questionDivs[i].id).parentNode.removeChild(document.getElementById(questionDivs[i].id));
    }
  }
  // Reformat the paragraphs
  for (var i = 0, len = paragraphs.length; i < len; i++) {
    paragraphs[i].style.borderLeft = "none";
    paragraphs[i].removeAttribute("onclick");
  }
}


// Make the call to the Citizenpedia
// - name: the id of the paragraph
function citizenpedia(name)
{
  var myElem = document.getElementById(name + "_questions");

  if (myElem === null) {
    getQuestions(simpaticoEservice, name, drawQuestionsBox);
  } else {
    hideQuestionsBox(name);
  }

}//citizenpedia

// Draw the questions box
// - name: the id of the paragraph
// - responseQuestions: the JSON Object of the questions related to the paragraph
function drawQuestionsBox(name, responseQuestions)
{

  // Create questions div
  var questionsDiv = document.createElement('div');
  questionsDiv.id = name + "_questions";
  questionsDiv.className = "citizenpedia_questions";
  questionsDiv.style.borderLeft = "thick solid " + functionColor;
  questionsDiv.style.borderTop = "thick solid " + functionColor;
  questionsDiv.style.backgroundColor = questionListBackgroundColor;
  
  // 1. the title is attached 
  questionsHtml = "<p " +   
                  "style=\" font-weight: bold; color: WHITE; background-color:" + functionColor + "; margin-left:0px; margin-right:0px \"" +    
                  "id=\"ctz-ui-qb-title\">" +    
                  questionsBoxTitle + "</p>";

  // 2. A list containing the made questions is attached
  questionsHtml += "<ul>";

  // 2.a. For each question a new bulletpoint is made 
  for (var i = 0; i < responseQuestions.length; i++) {
    questionsHtml += "<li onclick=\"cancelClick(event);\">" + 
                        "<a href=\"" + createQuestionDetailsURL(responseQuestions[i]._id) + "\">" + responseQuestions[i].title + "</a>" +
                     "</li>";
  }

  // 2.b. Finally the Add Question link is also attached 
  questionsHtml += "<li onclick=\"cancelClick(event);\">"
  questionsHtml +=    "<a href=\"" + createNewQuestionURL("Benestar", simpaticoEservice, name, document.getElementById(name).textContent) + "\">" + addQuestionLabel + "</a>"
  questionsHtml += "</li>";
  
  questionsHtml += "</ul>";

  questionsDiv.innerHTML = questionsHtml;
  document.getElementById(name).appendChild(questionsDiv);
} //drawQuestionsBox

// Hide the questions box attached to a paragraph passed as paramether
// - name: the id of the paragraph
function hideQuestionsBox(name)
{
  var qBoxToRemove = document.getElementById(name + "_questions");
  qBoxToRemove.parentNode.removeChild(qBoxToRemove);
}