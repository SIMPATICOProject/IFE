// TAE UI
// Functions regarding the TAE functionality


function simplify(name)
{
    functionColor = getFunctionColor("simplify");

    savedParagraph = document.getElementById(name).innerHTML;

    document.getElementById(name).style.borderBottom = "thick solid " + functionColor;

    getSimplifiedText(name,savedParagraph,changeText);
}

// Changes the text
function changeText(name, textReplace)
{
  var clonedDiv = document.getElementById(name).cloneNode(true);
  //var clonedDiv = document.createElement('div');
  clonedDiv.id=name+"_simplified";
  clonedDiv.setAttribute("onclick", "closeSimp()");
  clonedDiv.innerHTML = textReplace;
  clonedDiv.style.position='relative';

  fadeOut(document.getElementById(name), textReplace);

  termsGetDefinition();

}

function fadeOut(element, textReplace) {
    var left = 10;
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            var opa = 0.1;  // initial opacity
            element.style.display = 'block';
            var timer2 = setInterval(function () {
                if (opa >= 1){
                    clearInterval(timer2);
                }
                element.innerHTML = textReplace;
                element.setAttribute("onclick", "closeSimp('"+element.id+"')");
                element.style.opacity = opa;
                element.style.filter = 'alpha(opacity=' + opa * 100 + ")";
                element.style.left = left + 'px' // show frame
                opa += opa * 0.1;
                left-=10;
            }, 20);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        element.style.left = left + 'px' // show frame

        op -= op * 0.1;
        left+=10;
    }, 20);
}

function fadeIn(element, savedParagraph) {
    var left = 10;
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';

            var opa = 0.1;  // initial opacity
            element.style.display = 'block';
            var timer2 = setInterval(function () {
                if (opa >= 1){
                    clearInterval(timer2);
                }
                element.innerHTML = savedParagraph;
                element.setAttribute("onclick", "simplify('"+element.id+"')");
                element.style.borderBottom = "none";
                element.style.opacity = opa;
                element.style.filter = 'alpha(opacity=' + opa * 100 + ")";
                element.style.left = left + 'px' // show frame
                opa += opa * 0.1;
                left-=10;
            }, 20);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        element.style.left = left + 'px' // show frame

        op -= op * 0.1;
        left+=10;
    }, 20);
}


function closeSimp(name)
{
  fadeIn(document.getElementById(name), savedParagraph);
  termsGetDefinition();


}


function switchsimplify()
{
  functionColor = getFunctionColor("simplify");
  closeCitizenpedia();
  simplifyValue = document.getElementById('simplifySwitch').value;

  // Search for paragraphs
  if (paragraphs.length === 0) {
    paragraphs = document.getElementsByClassName("simp-text-paragraph");
  }

  if(simplifyValue == "simplifyOff"){
    document.getElementById("simplifySwitch").value="simplifyOn";

    //paragraphs.parrafo1.onclick = function() { checkButtons('parrafo1'); };
    paragraphId = 1;
      for (var i = 0, len = paragraphs.length; i < len; i++) {
        paragraphs[i].setAttribute("id", "Paragraph"+paragraphId);
        var paragraph = document.getElementById(paragraphs[i].id);
        var paragraphName = paragraphs[i].id;
        paragraphs[i].style.position='relative';
        paragraphs[i].setAttribute("onclick", "simplify('"+paragraphName+"');");
        paragraphs[i].style.borderLeft = "thick solid " + functionColor;
        paragraphId++;
      }

  }else{
    document.getElementById("simplifySwitch").value="simplifyOff";
    for (var i = 0, len = paragraphs.length; i < len; i++) {
      paragraphs[i].style.borderLeft = "none";
    }
  }
  termsGetDefinition();
}
