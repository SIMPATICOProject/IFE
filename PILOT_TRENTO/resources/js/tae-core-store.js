
 
// $(document).ready(function() {
  var sentences=[];
  var apiResults=[];
  var prepareResult=[];
  var globalTextCheckboxVal=true;
  var globalWordCheckboxVal=true;

  getTexts();
  getAPIResults();

  // if(jQuery.isEmptyObject(localStorage.dateOfBirth)){
  //       localStorage.weight=80;
  // }
  console.log("total sentences:",sentences);
  console.log("Total result:",apiResults);
  console.log("localStorageResult:", localStorage.getItem("localStorageResult"));

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="tooltip"]').on('click', function () {
    $(this).tooltip('hide');
  });
  $('#textTools').on('click', function () {
    $(this).popover({
      html : true, 
      content: function() {
        $(document.getElementById("textCheckbox")).attr("checked", globalTextCheckboxVal);
        $(document.getElementById("wordCheckbox")).attr("checked", globalWordCheckboxVal);
        return $("#popoverText").html();
      }
      // title: function() {
      //     return $("#example-popover-title").html();
      // }
    });
  });
// });



 




/**
* 
*
**/
function getTexts(){
  //var tataltexts= $("#main").text().split(/(?:\n)+/);
  var tataltexts= $("body").text().split(/(?:\n)+/);
  //var tataltexts= $("p").text().split(/(?:\n)+/);
  console.log("total number of text in the body:",tataltexts);
  /*collect all sentances in this page*/
  $.each(tataltexts, function (index, value){
    if(value.trim()){//remove all extra space
      // if(value.includes(".") && !value.includes("@")){//check sentances with '.' & not contain '@'
        //var tempSen = value.split('.');// maybe one <p> have more sentances for that split with '.'
        //var tempAppendSen="<p>";
        //$.each(tempSen, function(index2, value2){
          //if(value2.trim() && value2.length>16){//remove extra space & get sentances that more then 16 letter
            //sentences.push($.trim(value2));	
            //tempAppendSen=tempAppendSen+"<span id='rap"+sentences.length-1+"'>"+value2+".</span>";
            //tempAppendSen=tempAppendSen+"<span>"+value2+".</span>";
          //}
        //});
        //if(tempAppendSen.includes("<span>")){
          //$("p:contains("+value+")").replaceWith(tempAppendSen+"</p>" );
        //}
      // }
      var val = $.trim(value)
        
      //if($( "p" ).contents().find( $.trim(value) )){
      if($('p:contains("'+val+'")') && val.length>16){
        sentences.push(val);
        var i=sentences.length-1;
        //for p
        $('p:contains("'+val+'")').wrapInner("<span id='"+i+"'></span>");
          
          // $('p:contains("'+$.trim(value)+'")').html(function(_, html) {
          //     var valEx='/(+'+$.trim(value)+'$)/g';
          //    return html.replace(valEx, '<span class="smallcaps">$1</span>');
          // });
          // $('p:contains("'+$.trim(value)+'")').html(function(_, html) {
          //     var regex = new RegExp("/" + escapeRegExp($.trim(value)) + "$/g",'gi');
          //     var str = "<span class='smallcaps'>"+$.trim(value)+"</span>";
          //     return  html.replace(regex, str);
          // });
      }
      
      // if($('li:contains("'+$.trim(value)+'")').contents().not($('li').children())){
      //     //$($('li').contents().not($('li').children())).$('li:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      //     console.log("li is=> ",$.trim(value));
      //     console.log("li(not'a')=> ",$('li:contains("'+$.trim(value)+'")').contents().not($('li').children()).text());
      // }
      // if($('nav>ul>li>a:contains("'+$.trim(value)+'")')){
      //     $('nav>ul>li>a:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      // }
      
      //for ul>li
      // if($('ul>li:contains("'+$.trim(value)+'")')){
      //     $('ul>li:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      // }

      //for h3
      // if($('h3:contains("'+$.trim(value)+'")')){
      //     $('h3:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      // }
    }
  });
}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
* call api for all sentances and get data
*
**/
function getAPIResults(){
  var textURL="https://simpatico.smartcommunitylab.it/simp-engines/tae/simp";
  $.each(sentences, function (index, value){
    jQuery.getJSON(textURL + "?text=" + value,
      function(jsonResponse) {
        var words=[];
        apiResults.push({"domID":index,"domValue":jsonResponse});
        $.each(jsonResponse.simplifications, function(index2, value2){
          words.push({
            "originalWord":value2.originalValue,
            "start":value2.start,
            "end":value2.end,
            "Synonyms":value2.simplification,
            "definition":getDescription(value2.originalValue,jsonResponse.readability.forms),
            "wikilink":jsonResponse.linkings.getWikiLink(value2.originalValue)
          });
        });
        prepareResult.push({
          "elementID":index,
          "originalText":jsonResponse.text,
          "syntSimplifiedVersion":jsonResponse.syntSimplifiedVersion,
          "words":words
        });
      });
  });
  // Store
  localStorage.setItem("localStorageResult", JSON.stringify(prepareResult));
}
/**
* 
*
**/
Array.prototype.getWikiLink = function( word ){
  for ( var i in this )
  {
    if(this[i].originalText == word){
      return this[i].page;
    }
  }
  return -1;
}
/**
* 
*
**/
function getDescription(word, arr){
  var result = -1;
  $.each(arr, function( key, value ) {
    if(value.description.forms[0].search(new RegExp(word, 'i')) !== -1){
      result=value.description.description;
      return false;
    }
  });
  return result;
}
/**
* 
*
**/
function clickTextCheckbox(){
  var textElementVal=document.getElementById("textCheckbox");
  if(globalTextCheckboxVal){
    globalTextCheckboxVal=false;
    $(textElementVal).attr("checked", globalTextCheckboxVal);
    onTextSimplification(false);
    console.log("TextCheckbox is unchecked.");
  }else{
    globalTextCheckboxVal=true;
    $(textElementVal).attr("checked", globalTextCheckboxVal);
    onTextSimplification(true);
    console.log("TextCheckbox is checked.");
  }

}

/**
* 
*
**/
function clickWordCheckbox(){
  var wordElementVal=document.getElementById("wordCheckbox");
  if(globalWordCheckboxVal){
    globalWordCheckboxVal=false;
    $(wordElementVal).attr("checked", globalWordCheckboxVal);
    console.log("WordCheckbox is unchecked.");
  }else{
    globalWordCheckboxVal=true;
    $(wordElementVal).attr("checked", globalWordCheckboxVal);
    console.log("WordCheckbox is checked.");
  }

}

/**
* 
*
**/
function onTextSimplification(color){
  
  $.each(sentences, function (index, value){
    makeColorOfText(index,color);
  });
  
 
}

/**
* 
*
**/ 
function makeColorOfText(id,color){

  if(color == true){
    $('#'+id).css('background-color', '#FFFF99');
    console.log("make yellow color");
  }
  else if(color == false){
    $('#'+id).css('background-color', 'transparent');
    console.log("make white color");
  }  
}