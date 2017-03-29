var sfCORE = (function () {
  var instance;

  function Singleton () {
    var endpoint = '';

    function initComponent (parameters) {
      endpoint = parameters.endpoint;
    }

    function selectDialog (ctzSelected, simplificationSelected, timeoutExceeded, userId) {
      // Check which dialog show
      $.get(endpoint + "/sf/selectdialog?id="+userId+"&ctz="+ctzSelected+"&simpl="+simplificationSelected+"&timeout="+timeoutExceeded, 
        function (modalChosen) {
          showFeedbackDialog(modalChosen);
        });
    }

    // Internal
    function showFeedbackDialog (modalChosen) {
      var title_modal_session_feedback = "¡Envíenos sus comentarios!";
      $('<div id="dialogSF" />').html(modalChosen).dialog({
        title: title_modal_session_feedback,
        width: 700,
        height: 550,
        resizable: false,
        modal: true
      });
      $(".ui-dialog-overlay").css("opacity", "0.7");
      $('#dialogSF').show();
    }

    // Internal
    function sendFeedback () {
      // TODO
      var postData = {};
      $.post(endpoint + "/logs/insert", JSON.stringify(postData));
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