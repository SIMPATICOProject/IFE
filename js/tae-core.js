// TAE
// Methods and calls for TAE

var savedParagraph;

// Calls the TAE for the simplified text or word
function getSimplifiedText(name,originalText,simplifyCallback)
{
  // As we don't have a TAE working environment, we replace the text with a fake text
  // When we have the TAE working we will change it
  var textReplace = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula cursus auctor.';

  simplifyCallback(name,textReplace);
}

// Calls the Citizenpedia for the terms definitions
function termsGetDefinition()
{
  terms = document.getElementsByClassName("simp-text-term");

  for (var t = 0, len = terms.length; t < len; t++) {
    terms[t].setAttribute("id", "st"+t);
  }

  for (var t = 0, len = terms.length; t < len; t++) {
    termToChange = document.getElementById(terms[t].id);
    changeTooltip(termToChange);
  }
}

// Draws the tooltip that shows the term definition
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

// Cancel the click in case of clicking on top of a term
function cancelClick(e)
{
  if (!e) var e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
}
