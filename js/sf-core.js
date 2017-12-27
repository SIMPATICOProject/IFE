var sfCORE = (function () {
  var instance;

  function Singleton () {
    var endpoint = '';
    var listener = null;
    var language = null;

    function initComponent (parameters) {
      endpoint = parameters.endpoint;
      listener = parameters.listener;
      language = parameters.language || 'en';
    }

    function selectDialog (ctzSelected, simplificationSelected, timeoutExceeded, userId) {
      // Check which dialog show
      var lang = language; 
      $.get(endpoint + "/sf/selectdialog?id="+userId+"&ctz="+ctzSelected+"&simpl="+simplificationSelected+"&timeout="+timeoutExceeded+"&lang="+lang,
        function (modalChosen) {
          showFeedbackDialog(modalChosen, lang);
        });
    }

    // Internal
    function showFeedbackDialog (modalChosen, lang) {
      var title_modal_session_feedback = "Send us your comments!"
      if (lang == "es") title_modal_session_feedback = "¡Envíenos sus comentarios!";
      else if (lang == "it") title_modal_session_feedback = "Inviaci i tuoi commenti!"

      $('<div id="dialogSF" />').html(modalChosen).dialog({
  			title: title_modal_session_feedback,
      	modal: true,
  			resizable: true,
  			height: "auto",
  			width: 600
      });
      $('.ui-dialog').css('zIndex', '10000');
      $('#dialogSF').show();
      $('#dialogSF #button_cancel_session_feedback_text').off('click').on('click', function () {
    	  if (!!listener) listener();
    	  $('#dialogSF').dialog("destroy").remove();
      });
      $('#dialogSF #button_send_session_feedback_text').off('click').on('click', sendFeedback);
    }

    // Internal
    function sendFeedback () {
                console.log("SendFeedback");
  		var dataForms = $('#dialogSF input,#dialogSF textarea,#dialogSF select');
  		var dataObj = {};
  		dataForms.each(function(idx, d) {
  			var key = d.name ? d.name : d.id;
			if (d.type=='radio') {
				if (d.checked) dataObj[key] = d.value;
			} else {
  			dataObj[key] = d.value;
			}
  		});
                console.log("Sending:");
                console.log(dataObj);
  		logCORE.getInstance().sfLogger.feedbackData(simpaticoEservice, dataObj);
  		// TODO: manage complexity correctly
  		complexity = 0;
  		logCORE.getInstance().sfLogger.feedbackEvent(simpaticoEservice, complexity);

		if (!!listener) listener();
      // Close dialog
      $('#dialogSF').dialog("destroy").remove();
    }

    return {
      init: initComponent,
      selectDialog: selectDialog
    };
  }

  return {
    getInstance: function () {
      if (!instance) instance = Singleton();
      return instance;
    }
  };
})();
