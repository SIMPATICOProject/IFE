// CITIZENPEDIA
// Citizepedia Calls and methods


function getQuestions(simpaticoEservice,name,questionsCallback)
{
  jQuery.getJSON(baseURL+'/citizenpedia/api/qae/questions/'+simpaticoEservice+'/'+name,
    function(jsonResponse)
    {
      questionsCallback(name,jsonResponse);
    });
}
