// Declare here the base url which will be used for the api
var baseURL = 'https://simpatico.morelab.deusto.es/';

var annotatedText = [];
var paragraphs =[];
var questionsHtml;

var buttons = ["simplify", "forms", "citizenpedia","login"];
var functionsColors = {"simplify":"#0000FF", "forms":"#de453e", "citizenpedia":"#379e4c","login":"#0000FF"};

var savedParagraph;

document.addEventListener('DOMContentLoaded', pageLoaded);

function pageLoaded() {
    // Add Simpatico bar
    //document.getElementById("simpatico_top").innerHTML = '<div id="simpatico_bar" style="background-color:yellow"> <img src="logo.png" height="50" width="50" alt="Simpatico" /><i class="fa fa-hand-scissors-o fa-3x"><input type="button" value="simplifyOff" id="simplifySwitch" onclick="switchSimplify();"></i><i class="fa fa-book fa-3x"><input type="button" value="defineOff" id="defineSwitch" onclick="switchDefine();"></i><i class="fa fa-pencil fa-3x"><input type="button" value="annotateOff" id="annotateSwitch" onclick="switchAnnotate();"></i><i class="fa fa-question fa-3x"><input type="button" value="citizenPediaOff" id="citizenPediaSwitch" onclick="switchCitizenPedia();"></i><i class="fa fa-user fa-3x"><input type="button" value="logIn" id="loginButton" onclick="handleAuthClick();"></i><button style="display:none" id="signout-button" onclick="handleSignoutClick()">Sign Out</button></div>';
    //document.getElementById("simpatico_top").innerHTML += '<style>.tooltip {position: relative;display: inline-block;border-bottom: 1px dotted black;}.tooltip .tooltiptext {visibility: hidden;width: 120px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 5px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -60px;opacity: 0;transition: opacity 1s;}.tooltip .tooltiptext::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}.tooltip:active .tooltiptext {visibility: visible;opacity: 1;}</style>';

    simpaticoBarHtml = '<div id="simpatico_bar" style="background-color:#d3d3d6; position: fixed; top:0; width: 100%; z-index: 999;"> <img src="logo.png" height="50" width="50" alt="Simpatico" />';

    for (var i = 0; i < buttons.length; i++) {
      simpaticoBarHtml += '<button type="submit" id="'+buttons[i]+'Switch" value="'+ buttons[i]+'Off" style="visibility: hidden; border: 0; background: transparent" onclick="switchFunction(\''+buttons[i]+'\');"><img id="'+ buttons[i]+'img" src="img/'+ buttons[i]+'.png" width="50" height="50" alt="submit" /></button>';
    }

    simpaticoBarHtml += '<span id="userdata"></span>';

    simpaticoBarHtml += '</div>';

    document.getElementById("simpatico_top").innerHTML = simpaticoBarHtml;
    document.getElementById("simpatico_top").innerHTML += '<style>.tooltip {position: relative;display: inline-block;border-bottom: 1px dotted black;}.tooltip .tooltiptext {visibility: hidden;width: 120px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 5px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -60px;opacity: 0;transition: opacity 1s;}.tooltip .tooltiptext::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}.tooltip:active .tooltiptext {visibility: visible;opacity: 1;}</style>';
    document.getElementById("loginSwitch").style.float = "right";
    document.getElementById("loginSwitch").style.visibility = "visible";

    document.getElementById("userdata").style.float = "right";
}


function showButtons()
{
  for (var i = 0; i < buttons.length; i++) {
    document.getElementById(buttons[i]+'Switch').style.visibility = "visible";
  }
}

function hideButtons()
{
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] != "login") {
        document.getElementById(buttons[i]+'Switch').style.visibility = "hidden";
    }

  }
}

function switchFunction(functionName)
{

  if (functionName == "login") {
    handleAuthClick();
  } else {
    for (var i = 0; i < buttons.length; i++) {
      document.getElementById(buttons[i]+"Switch").style.borderLeft = "none";
      if (buttons[i] === functionName) {
          document.getElementById(functionName+"Switch").style.borderLeft = "thick solid " + functionsColors[functionName];
      }

    }
    window["switch"+functionName]();

  }


}

function simplify(name)
{
    savedParagraph = document.getElementById(name).innerHTML;

    document.getElementById(name).style.borderBottom = "thick solid " + functionsColors["simplify"];

    // As we don't have a TAE working environment, we replace the text with a fake text
    var textReplace = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula cursus auctor.';

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

// Buttons
function switchsimplify()
{
  closeCitizenpedia();
  simplifyValue = document.getElementById('simplifySwitch').value;

  // Search for paragraphs
  if (paragraphs.length == 0) {
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
        paragraphs[i].style.borderLeft = "thick solid " + functionsColors["simplify"];
        //paragraph.onclick = function(paragraphName) { checkButtons(paragraphName); };
        paragraphId++;
      }

  }else{
    document.getElementById("simplifySwitch").value="simplifyOff";
    for (var i = 0, len = paragraphs.length; i < len; i++) {
      paragraphs[i].style.borderLeft = "none";
      //paragraph.onclick = function(paragraphName) { checkButtons(paragraphName); };
    }
  }
  termsGetDefinition();
}

function switchforms()
{
  console.log("switchforms");
}


/////////////////////////////////// CITIZENPEDIA

function switchcitizenpedia()
{
  if (document.getElementById('simplifySwitch').value == "simplifyOn") {
      switchFunction("simplify");
  }

  if (paragraphs.length == 0) {
    paragraphs = document.getElementsByClassName("simp-text-paragraph");
  }

  var paragrapId = 1;
  for (var i = 0, len = paragraphs.length; i < len; i++) {
    paragraphs[i].setAttribute("id", "Paragraph"+paragrapId);
    var paragraph = document.getElementById(paragraphs[i].id);
    var paragraphName = paragraphs[i].id;
    paragraphs[i].style.position='relative';
    paragraphs[i].setAttribute("onclick", "citizenpedia('"+paragraphName+"');");
    paragraphs[i].style.borderLeft = "thick solid " + functionsColors["citizenpedia"];
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
    questionsDiv.style.borderLeft = "thick solid " + functionsColors["citizenpedia"];
    questionsDiv.style.borderTop = "thick solid " + functionsColors["citizenpedia"];
    questionsDiv.style.backgroundColor = "#a9a7a7";

    questionsHtml = "RELATED QUESTIONS:<ul>";

    jQuery.getJSON(baseURL+'/citizenpedia/api/qae/questions/'+simpaticoEservice+'/'+name,
      function(jsonResponse)
      {
        for (var q = 0; q < Object.keys(jsonResponse).length; q++) {
          questionsHtml += "<li onclick=\"cancelClick(event);\"><a href=\""+ baseURL + "citizenpedia/questions/show/"+Object.values(jsonResponse)[q]._id + "\">" + Object.values(jsonResponse)[q].title + "</a></li>";

        }
        questionsHtml += "<li onclick=\"cancelClick(event);\"><a href=\"https://simpatico.morelab.deusto.es/citizenpedia/questions/create?tags=Benestar,"+simpaticoEservice+","+name+"\">Add New Question</a></li>";
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

///////////////////////////////////
// GOOGLE OAUTH
function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
      apiKey: 'AIzaSyABSlDxVQ1yv_4kGEMcazYMu-X3NJg8yZA',
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
      clientId: '167570783497-frbg9dr5da757u3a35rln8elrak51euj.apps.googleusercontent.com',
      scope: 'profile'
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  document.getElementById('loginimg').src = "img/login.png";
  document.getElementById('loginSwitch').setAttribute("onclick", "switchFunction('login');");
  document.getElementById('userdata').innerHTML = "";
  hideButtons();

}

function makeApiCall() {
  gapi.client.people.people.get({
    resourceName: 'people/me'
  }).then(function(resp) {
    document.getElementById('userdata').innerHTML = 'Hello, ' + resp.result.names[0].givenName;
    document.getElementById('userdata').style = "display:block";
    document.getElementById('loginimg').src = "img/ic_on.png";
    document.getElementById('loginSwitch').setAttribute("onclick", "handleSignoutClick()");
    showButtons();
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}
