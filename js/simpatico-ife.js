// Declare here the base url which will be used for the api
var baseURL = 'https://simpatico.morelab.deusto.es/';
var functionColor;
var buttons = [
                {
                  id: "simplify",
                  alt: "Simplify and define",
                  color: "#0000FF"
                },
                // {
                //   id: "forms",
                //   alt: "Form simplification",
                //   color: "#de453e"
                // },
                {
                  id: "citizenpedia",
                  alt: "Questions and answers",
                  color: "#379e4c"
                },
                {
                  id: "login",
                  alt: "Autheticate",
                  color: "#0000FF"
                },
                {
                  id: "enrich",
                  alt: "Enrich",
                  color: "#0000FF"
                }
              ];

document.addEventListener('DOMContentLoaded', pageLoaded);

function pageLoaded() {
    // Add Simpatico bar
    //document.getElementById("simpatico_top").innerHTML = '<div id="simpatico_bar" style="background-color:yellow"> <img src="logo.png" height="50" width="50" alt="Simpatico" /><i class="fa fa-hand-scissors-o fa-3x"><input type="button" value="simplifyOff" id="simplifySwitch" onclick="switchSimplify();"></i><i class="fa fa-book fa-3x"><input type="button" value="defineOff" id="defineSwitch" onclick="switchDefine();"></i><i class="fa fa-pencil fa-3x"><input type="button" value="annotateOff" id="annotateSwitch" onclick="switchAnnotate();"></i><i class="fa fa-question fa-3x"><input type="button" value="citizenPediaOff" id="citizenPediaSwitch" onclick="switchCitizenPedia();"></i><i class="fa fa-user fa-3x"><input type="button" value="logIn" id="loginButton" onclick="handleAuthClick();"></i><button style="display:none" id="signout-button" onclick="handleSignoutClick()">Sign Out</button></div>';
    //document.getElementById("simpatico_top").innerHTML += '<style>.tooltip {position: relative;display: inline-block;border-bottom: 1px dotted black;}.tooltip .tooltiptext {visibility: hidden;width: 120px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 5px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -60px;opacity: 0;transition: opacity 1s;}.tooltip .tooltiptext::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}.tooltip:active .tooltiptext {visibility: visible;opacity: 1;}</style>';

    simpaticoBarHtml = '<div id="simpatico_bar" style="background-color:#d3d3d6; position: float; top:0; width: 100%; z-index: 999;">'+
                        '<img src="img/logo.png" height="50" width="50" alt="Simpatico" />';

    for (var i = 0; i < buttons.length; i++) {
      simpaticoBarHtml += '<button type="submit" id="'+buttons[i].id+'Switch" value="'+ buttons[i].id+'Off" '+
                          'style="visibility: hidden; border: 0; background: transparent" onclick="switchFunction(\''+buttons[i].id+'\');">'+
                          '<img alt="'+buttons[i].alt+'" id="'+ buttons[i].id+'img" src="img/'+ buttons[i].id+'.png" width="50" height="50" alt="submit" />'+
                          '</button>';
    }

    simpaticoBarHtml += '<span id="userdata"></span>';

    simpaticoBarHtml += '</div>';

    document.getElementById("simpatico_top").innerHTML = simpaticoBarHtml;
    document.getElementById("simpatico_top").innerHTML += '<style>.tooltip {position: relative;display: inline-block;border-bottom: 1px dotted black;}.tooltip .tooltiptext {visibility: hidden;width: 120px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 5px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -60px;opacity: 0;transition: opacity 1s;}.tooltip .tooltiptext::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}.tooltip:active .tooltiptext {visibility: visible;opacity: 1;}</style>';
    document.getElementById("loginSwitch").style.float = "right";
    document.getElementById("loginSwitch").style.visibility = "visible";

    document.getElementById("userdata").style.float = "right";

    initUserData();
}


function showButtons()
{
  for (var i = 0; i < buttons.length; i++) {
    document.getElementById(buttons[i].id+'Switch').style.visibility = "visible";
  }
}

function hideButtons()
{
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].id != "login") {
        document.getElementById(buttons[i].id+'Switch').style.visibility = "hidden";
    }

  }
}

function switchFunction(functionName)
{

  if (functionName == "login") {
    handleAuthClick();
  } else {
    for (var i = 0; i < buttons.length; i++) {
      document.getElementById(buttons[i].id+"Switch").style.borderLeft = "none";
      if (buttons[i].id === functionName) {
          document.getElementById(functionName+"Switch").style.borderLeft = "thick solid " + buttons[i].color[functionName];
      }

    }
    window["switch"+functionName]();

  }

}

function switchenrich()
{

  // No functionality at the moment
  taeUI.init();
  taeUI.showDialog();
}

function getFunctionColor(functionName)
{
    var color;

    buttons.forEach(function(b) {
      if (b.id == functionName) { color = b.color; }
    });

    return color;
}
