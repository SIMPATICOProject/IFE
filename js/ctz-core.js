// CITIZENPEDIA
// Citizepedia Calls and methods


// Get questions from Citizenpedia. Need the eservice code and the paragraph or sentence id
function getQuestions(simpaticoEservice,name,questionsCallback)
{
  jQuery.getJSON(baseURL+'/citizenpedia/api/qae/questions/'+simpaticoEservice+'/'+name,
    function(jsonResponse)
    {
      questionsCallback(name,jsonResponse);
    });
}
