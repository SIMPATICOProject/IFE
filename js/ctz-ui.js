// CITIZENPEDIA UI

var paragraphs =[];
var questionsHtml;
var questionsLabel = "RELATED QUESTIONS:";

function switchcitizenpedia()
{
  functionColor = getFunctionColor("citizenpedia");

  if (document.getElementById('simplifySwitch').value == "simplifyOn") {
      switchFunction("simplify");
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

function citizenpedia(name)
{
  var myElem = document.getElementById(name + "_questions");

  if (myElem === null) {
    getQuestions(simpaticoEservice,name,drawQuestions);
  }

}//citizenpedia


function drawQuestions(name,responseQuestions)
{

  // Create questions div
  var questionsDiv = document.createElement('div');
  questionsDiv.id=name + "_questions";
  questionsDiv.className="citizenpedia_questions";
  questionsDiv.style.borderLeft = "thick solid " + functionColor;
  questionsDiv.style.borderTop = "thick solid " + functionColor;
  questionsDiv.style.backgroundColor = "#a9a7a7";

  questionsHtml = questionsLabel + '<ul>';

  for (var q = 0; q < Object.keys(responseQuestions).length; q++) {
    questionsHtml += "<li onclick=\"cancelClick(event);\"><a href=\""+ baseURL + "citizenpedia/questions/show/"+Object.values(responseQuestions)[q]._id + "\">" + Object.values(responseQuestions)[q].title + "</a></li>";

  }
  questionsHtml += "<li onclick=\"cancelClick(event);\"><a href=\"https://simpatico.morelab.deusto.es/citizenpedia/questions/create?tags=Benestar,"+simpaticoEservice+","+name+"\">Add New Question</a></li>";
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
