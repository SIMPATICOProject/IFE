// CITIZENPEDIA
// Citizepedia Methods


var paragraphs =[];
var questionsHtml;

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
    // Create questions div
    var questionsDiv = document.createElement('div');
    questionsDiv.id=name + "_questions";
    questionsDiv.className="citizenpedia_questions";
    questionsDiv.style.borderLeft = "thick solid " + functionColor;
    questionsDiv.style.borderTop = "thick solid " + functionColor;
    questionsDiv.style.backgroundColor = "#a9a7a7";

    questionsHtml = "RELATED QUESTIONS:<ul>";

    jQuery.getJSON(baseURL+'/citizenpedia/api/qae/questions/'+simpaticoEservice+'/'+name,
      function(jsonResponse)
      {
        for (var q = 0; q < Object.keys(jsonResponse).length; q++) {
          questionsHtml += "<li onclick=\"cancelClick(event);\"><a href=\""+ baseURL + "citizenpedia/questions/show/"+Object.values(jsonResponse)[q]._id + "\">" + Object.values(jsonResponse)[q].title + "</a></li>";

        }
        questionsHtml += "<li onclick=\"cancelClick(event);\"><a href=\"https://simpatico.morelab.deusto.es/citizenpedia/questions/create?text="+document.getElementById(name).textContent+"&tags=Benestar,"+simpaticoEservice+","+name+"\">Add New Question</a></li>";
        questionsHtml += "</ul>";
        questionsDiv.innerHTML = questionsHtml;
        document.getElementById(name).appendChild(questionsDiv);
      });

  }

}//citizenpedia

function closeCitizenpedia()
{
  var questionDivs = document.getElementsByClassName("citizenpedia_questions");

  if (questionDivs.length>0) {
    for (var i = 0; i <= questionDivs.length; i++) {
      document.getElementById(questionDivs[i].id).parentNode.removeChild(document.getElementById(questionDivs[i].id));
    }
  }
}

/////////////////////////////////// CITIZENPEDIA

function termsGetDefinition()
{
  console.log("termsGetDefinition");
  terms = document.getElementsByClassName("simp-text-term");

  for (var t = 0, len = terms.length; t < len; t++) {
    terms[t].setAttribute("id", "st"+t);
  }

  for (var t = 0, len = terms.length; t < len; t++) {
    termToChange = document.getElementById(terms[t].id);
    changeTooltip(termToChange);
  }
}


function changeTooltip(termToChange)
{

  var termHTML = termToChange.innerHTML;
  var term = termToChange.innerText;
  term = term.replace("(","");
  term = term.replace(")","");

  jQuery.getJSON(baseURL+'/citizenpedia/api/terms/'+ term,
    function(wikiResponse)
    {
      //var firstObject = Object.keys(wikiResponse)[0];
      termToChange.style["text-decoration"] = "underline";
      termToChange.innerHTML = '<div class="tooltip" onclick="cancelClick(event);">'+termHTML+'<span class="tooltiptext">'+wikiResponse[0].content+'</span></div>';

    });


}

function cancelClick(e)
{
  if (!e) var e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
}
