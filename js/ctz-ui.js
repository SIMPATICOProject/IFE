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


// Gets every paragraph tagged and decorate it
function switchcitizenpedia()
{
  functionColor = getFunctionColor("citizenpedia");
  functionColor = "#24BCDA"

  if (document.getElementById('citizenpediaSwitch').value == "citizenpediaOn") {
      switchFunction("citizenpedia");
  }

  if (paragraphs.length === 0) {
    paragraphs = document.getElementsByClassName("simp-text-paragraph");
  }

  var paragrapId = 1;
  for (var i = 0, len = paragraphs.length; i < len; i++) {
    paragraphs[i].setAttribute("id", "Paragraph"+paragrapId);
    var paragraph = document.getElementById(paragraphs[i].id);
    var paragraphName = paragraphs[i].id;
    paragraphs[i].style.position='relative';
    paragraphs[i].setAttribute("onclick", "citizenpedia('"+paragraphName+"');");
    paragraphs[i].style.borderLeft = "thick solid " + functionColor;
    //paragraph.onclick = function(paragraphName) { checkButtons(paragraphName); };
    paragrapId++;
  }
} //switchcitizenpedia()


// Make the call to the Citizenpedia
function citizenpedia(name)
{
  var myElem = document.getElementById(name + "_questions");

  if (myElem === null) {
    getQuestions(simpaticoEservice, name, drawQuestions);
  }

}//citizenpedia

// Draw the questions box
function drawQuestions(name, responseQuestions)
{

  // Create questions div
  var questionsDiv = document.createElement('div');
  questionsDiv.id=name + "_questions";
  questionsDiv.className = "citizenpedia_questions";
  questionsDiv.style.borderLeft = "thick solid " + functionColor;
  questionsDiv.style.borderTop = "thick solid " + functionColor;
  questionsDiv.style.backgroundColor = questionListBackgroundColor;

  questionsHtml = "<p " +   
                  "style=\" font-weight: bold; color: WHITE; background-color:" + functionColor + "; margin-left:0px; margin-right:0px \"" +    
                  "id=\"ctz-ui-qb-title\">" +    
                  questionsBoxTitle + "</p>";

  questionsHtml += "<ul>";
  
  for (var q = 0; q < Object.keys(responseQuestions).length; q++) {
    questionsHtml += "<li onclick=\"cancelClick(event);\">" + 
                        "<a href=\"" + createQuestionDetailsURL(Object.values(responseQuestions)[q]._id) + "\">" + Object.values(responseQuestions)[q].title + "</a>" +
                     "</li>";
  }

  questionsHtml += "<li onclick=\"cancelClick(event);\">"
  questionsHtml +=    "<a href=\"" + createNewQuestionURL("Benestar", simpaticoEservice, name, document.getElementById(name).textContent) + "\">" + addQuestionLabel + "</a>"
  questionsHtml += "</li>";
  
  questionsHtml += "</ul>";

  questionsDiv.innerHTML = questionsHtml;
  document.getElementById(name).appendChild(questionsDiv);
}

function closeCitizenpedia()
{
  var questionDivs = document.getElementsByClassName("citizenpedia_questions");

  if (questionDivs.length>0) {
    for (var i = 0; i <= questionDivs.length; i++) {
      document.getElementById(questionDivs[i].id).parentNode.removeChild(document.getElementById(questionDivs[i].id));
    }
  }
}