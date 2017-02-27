// Citizenpedia Core Client (ctz-core.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the client side of the Citizenpedia component.
// - It has the main Citizepedia calls and methods used by ctz-ui.js
// - All this methods are related to the feature/button named 'citizenpedia' 
//   in the buttons variable (see simpatico-ife.js code) 
//-----------------------------------------------------------------------------


// Declarations of the main URLs and paths to call the features of the 
// citizenpedia component located in the URL described in citizenpediaURL 
// (declared in ctz-ui.js).
if (typeof citizenpediaURL !== 'undefined') {
	if (citizenpediaURL != 'https://my-citizenpedia-instace.com') {
		var createQuestionURL = citizenpediaURL + '/questions/create';
    	var showQuestionURL =   citizenpediaURL + '/questions/show';
    	var getQuestionsAPI =   citizenpediaURL + '/api/qae/questions';
	} else {
		console.error("The citizenpediaURL variable is not defined. " + 
		"The citizenpediaURL var should be correctly declared in ctz-ui.js")
	}
} else {
	console.error("The citizenpediaURL variable is not defined. " + 
		"The ctz-ui.js file should be loaded before ctz-core.js")
}


// Get questions from Citizenpedia. Need the eservice code and the paragraph or sentence id
function getQuestions(simpaticoEservice, name, questionsCallback)
{
  jQuery.getJSON(getQuestionsAPI + '/' + simpaticoEservice + '/' + name,
    function(jsonResponse)
    {
      questionsCallback(name, jsonResponse);
    });
}

// It creates an URL which can be used to redirect to the details of the question passed as parameter
function createQuestionDetailsURL(questionID)
{
	return showQuestionURL + '/' + questionID
}

// It creates an URL which can be used to redirect and create a question related to the info. passed as parameters
function createNewQuestionURL(category, serviceID, paragraphID, text)
{
  return createQuestionURL + "?text=" + text + " &tags=" + category + "," + serviceID + "," + paragraphID
}