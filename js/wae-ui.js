/**
 * WORKFLOW ENGINE UI OPERATIONS
 */
var waeUI = (function () {

  var instance; // Singleton Instance of the UI component

  function Singleton() {
	
	var blockMap = {};
	var moduleErrorMessage;
	var topBarHeight = 50;
	var errorLabel = {};
    this.active = false;
    this.idProfile = null;
    var lang = "es";
	var currentParagraphId,currentParagraphTitle;
  	var labels = {
			prevButtonLabel: 'Anterior',
			nextButtonLabel: 'Siguiente',
			lastButtonLabel: 'Finalizar',
			descriptionLabel: 'Descripción'
	};
	
	/**
	 * INITIALIZE UI COMPONENT.
	 * CONFIG PARAMETERS:
	 * - endpoint: URL OF THE WAE REPOSITORY ENDPOINT TO LOAD MODELS (FOR CORE MODULE)
	 * - nextButtonLabel: TEXT FOR NEXT BUTTON
	 * - prevButtonLabel: TEXT FOR PREV BUTTON
	 * - topBarHeight: HEIGHT OF THE BAR
	 */
	this.init = function(config) {
		config = config || {};
		if (config.lang) {
			lang = config.lang;
		}
		if (config.endpoint) {
			waeEngine.init({endpoint: config.endpoint});
		}
		labels.prevButtonLabel = config.prevButtonLabel || labels.prevButtonLabel;
		labels.nextButtonLabel = config.nextButtonLabel || labels.nextButtonLabel;
		labels.lastButtonLabel = config.lastButtonLabel || labels.lastButtonLabel;
		labels.descriptionLabel = config.descriptionLabel || labels.descriptionLabel;
		topBarHeight = config.topBarHeight || topBarHeight;
		errorLabel = config.errorLabel;
	}

	var logger = function(event, details) {
      if (logCORE != null) return logCORE.getInstance().waeLogger;
      else return {logWae: function(){}, logBlockStart: function(){}, logBlockEnd: function(){}};
    }
	
	/**
	 * LOAD MODEL FROM ENGINE
	 */
	this.loadModel = function(idProfile) {
		var moduleUri = $("[data-simpatico-workflow]").attr('data-simpatico-workflow');
		if (!!idProfile) {
			this.idProfile = idProfile;
		}
		// waeEngine.loadModel(moduleUri, this.idProfile, moduleLoaded, moduleLoadError);
		waeEngine.loadModel(moduleUri, this.idProfile, setParagraphGuide, moduleLoadError);
	};
	function setParagraphGuide(blocks){
		console.log("Data::",blocks);
		//to set paragraph ID in every block
		citizenpediaUI.getInstance().setParagraphId();
		var paragraphId = 1;
		$.each(blocks, function(k, v) {
			// var param=paragraphId+',"'+encodeURI(v.description.it)+'"';
			// var param=JSON.stringify(v);
			$("#paragraphTitles").append("<p id='guide"+k+"' onclick='waeUI.getInstance().detailsHelp("+paragraphId+")' class='groupList'>"+k+"</p>");
			
			$( "#guide"+k ).on({
				click: function(){
					// currentParagraphId='Paragraph'+paragraphId;	
					
				},
				mouseenter: function() {
				  $( this ).addClass( "hoverList" );
				}, 
				mouseleave: function() {
				  $( this ).removeClass( "hoverList" );
				}
			});
			paragraphId++;
		});
	}
	this.detailsHelp= function(paragraphId){
		if (waeEngine.isLoaded()) {
			// waeEngine.nextBlock(function(callback){console.log("comeback:",callback);}, function(callbackmsg){console.log("comeback:",callbackmsg);});
			waeEngine.setActualBlock(paragraphId-1);
			// console.log("blocks::",waeEngine.workflowModel.blocks[paragraphId]);
			console.log("getActualBlockIndex::",waeEngine.getActualBlockIndex());
			console.log("getBlockDescription::",waeEngine.getBlockDescription());
			$("#blockDetails").html(waeEngine.getBlockDescription().it);
		}
		// console.log("paragraphId::",paragraphId,"text::",decodeURI(txt));
		currentParagraphId='Paragraph'+paragraphId;	
		currentParagraphTitle="test123...";
		
		window.location.hash='#'+currentParagraphId;
		qaeCORE.getInstance().getQuestions(simpaticoEservice,currentParagraphId,function(paragraphName, jsonResponse){
			console.log("question::",jsonResponse);
			if(jsonResponse.length > 0){
				var questions="",answers=0;
				$.each(jsonResponse, function(key, val) {
					if(val.answers.length>0){answers=val.answers.length;}
					questions += "<b>"+answers+"</b> "+val.title+"<br>";
				});
				$("#blockQuestions").html(questions);
			}else{
				$("#blockQuestions").html(" ");
			}
			
		});
	}
	this.createNewQuestion=function(){
		window.open(qaeCORE.getInstance().createNewQuestionURL(simpaticoCategory,simpaticoEservice,currentParagraphId,currentParagraphTitle),"_blank");
	}
    this.isEnabled = function(){
      return instance.active;
    }
    this.enable = function(idProfile) {
    	if (waeEngine.isLoaded()) {
    		for(var key in blockMap) {
    			if(blockMap.hasOwnProperty(key)) {
    				showElement(key, "HIDE");
    			}
    		}
    		waeEngine.restartBlock(doActions, moduleErrorMsg);    		
    	} else {
        	this.loadModel(idProfile);
    	}
		logCORE.getInstance().startActivity('wae', 'simplification');
		instance.active = true;
    }
	/**
	 * RETURN TRUE IF THE CURRENT PAGE CONTAINS FORM TO SIMPLIFY
	 */
	this.available = function(){
		var ens = $("[data-simpatico-workflow]");
		if(ens && ens.length > 0) return true;
		return false;
	}
	/**
	 * RESET THE VIEW
	 */
	this.reset = function(stay){
		for(var key in blockMap) {
			if(blockMap.hasOwnProperty(key)) {
				showElement(key, "SHOW");
			}
		}
		resetBlock(waeEngine.getActualBlockId());
		instance.active = false;
		if (!stay) $('html, body').animate({scrollTop: 0}, 200);
		logCORE.getInstance().endActivity('wae', 'simplification');
	}
    this.disable = this.reset;


	function moduleLoaded(map) {
		blockMap = map;
		for(var key in map) {
			if(map.hasOwnProperty(key)) {
				showElement(key, "HIDE");
			}
		}
		logger().logWae(simpaticoEservice);
		waeEngine.nextBlock(doActions, moduleErrorMsg);
		logger().logBlockStart(simpaticoEservice, waeEngine.getActualBlockId());
	};
	
	function moduleLoadError(text) {
		alert("Model error");
	};
	
	function showElement(simpaticoId, state) {
		var element = waeEngine.getSimpaticoBlockElement(simpaticoId);
		if(element != null) {
			if(state == "SHOW") {
				element.fadeTo("fast", 1);
				element.removeClass('wae-disabled');
				//$(element).children().prop('disabled', false);
			} else if(state == "HIDE") {
				element.addClass('wae-disabled');
				element.fadeTo("fast", 0.3);
				//$(element).children().prop('disabled', true);
			}
		}
	};
	
	function resetBlock(simpaticoId) {
		var element = waeEngine.getSimpaticoBlockElement(simpaticoId);
		if(element != null) {
			var container = waeEngine.getSimpaticoContainer();
			if(container != null) {
				$(container).replaceWith(element);
			}
		}
	};
	
	function editBlock(simpaticoId) {
		var element = waeEngine.getSimpaticoBlockElement(simpaticoId);
		if(element != null) {
			element.wrap("<div data-simpatico-id='simpatico_edit_block' class='block_edited_wrapper col-md-12'><div  class='block_edited'></div></div>" );
			var container = waeEngine.getSimpaticoContainer();
			var containerInt = $(container).find(".block_edited");
			if(container != null) {
				//add prev button
				if(waeEngine.getActualBlockIndex() > 0) {
					$(containerInt).append(createPrevButton());
				}
				//add next button
				if(waeEngine.getActualBlockIndex() < (waeEngine.getBlocksNum() - 1)) {
					$(containerInt).append(createNextButton());
				} else {
					$(containerInt).append(createLastButton());
				}
				//add error message
				$(containerInt).append(createErrorMsg());
				var offset = $(container).offset();
				if (offset) {
					var position = offset.top - topBarHeight;
				$('html, body').animate({scrollTop: position}, 200);
				}
				var description = waeEngine.getBlockDescription();
				if (description && description[lang]) {
					description = description[lang];
				} else {
					description = "";
				}
				$(container).append(createDescription(description));
			}
		}
	};
	
	function doActions(actions) {
		moduleErrorMessage = "";
		for(var blockId in actions) {
			var state = actions[blockId];
			if(state == "HIDE") {
				resetBlock(blockId);
				showElement(blockId, "HIDE");
			}
		}
		for(var blockId in actions) {
			var state = actions[blockId];
			if(state == "SHOW") {
				showElement(blockId, "SHOW");
				editBlock(blockId);
				break;
			}
		}
	};
	
	function moduleErrorMsg(text) {
		var keyNames = Object.keys(JSON.parse(text));
		var blockId = keyNames[0];
		moduleErrorMessage = errorLabel[blockId];
		var element = $("#div_simpatico_error_msg");
		if(element != null) {
			$(element).text(moduleErrorMessage);
		}
	};
	
	function createErrorMsg() {
		return $('<label/>', {
			text: '',
			id: 'div_simpatico_error_msg'
		});
	};
	function createDescription(text) {
		return $('<div id="div_simpatico_block_description"><h5>'+labels.descriptionLabel+'</h5><div class="div_simpatico_block_description_content">'+text+'</div></div>');
	};

	function createNextButton() {
	  return $('<button/>', {
	  	type: 'button',
	    text: labels.nextButtonLabel,
	    class: 'ui-button ui-widget',
	    id: 'btn_simpatico_next'
	  }).click(nextBlock);
	};
	function createLastButton() {
		  return $('<button/>', {
		  	type: 'button',
		    text: labels.lastButtonLabel,
		    class: 'ui-button ui-widget',
		    id: 'btn_simpatico_next'
		  }).click(lastBlock);
		};
	
	function nextBlock() {
		if (waeEngine.getActualBlockId()) logger().logBlockEnd(simpaticoEservice, waeEngine.getActualBlockId());
		waeEngine.nextBlock(doActions, moduleErrorMsg);
		if (waeEngine.getActualBlockId()) logger().logBlockStart(simpaticoEservice, waeEngine.getActualBlockId());
	};
	function lastBlock() {
		instance.reset(true);
	};

	function createPrevButton() {
	  return $('<button/>', {
	    type: 'button',
	  	text: labels.prevButtonLabel,
	  	class: 'ui-button ui-widget',
	    id: 'btn_simpatico_prev'
	  }).click(prevBlock);
	};
	
	function prevBlock() {
		if (waeEngine.getActualBlockId()) logger().logBlockEnd(simpaticoEservice, waeEngine.getActualBlockId());
		waeEngine.prevBlock(doActions, moduleErrorMsg);
		if (waeEngine.getActualBlockId()) logger().logBlockStart(simpaticoEservice, waeEngine.getActualBlockId());
	};
  }
  return {
    	getInstance: function() {
    		if(!instance) instance = new Singleton();
    		return instance;
    	}
    };
})();
