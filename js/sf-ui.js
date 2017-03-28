// Session Feedback User Interface (sf-ui.js)
//-----------------------------------------------------------------------------
// This Javascripts contains the methods to open the Session Feedback
// dialog and send it via POST using its API
//-----------------------------------------------------------------------------

var sfUI = (function () {
  var instance; // Singleton Instance of the UI component

  function Singleton() {
    // Compònent-related variables
    var buttonToShowSfId = '';

    // Internal parts
    var ctzSelected = false;
    var simplificationSelected = false;
    var timeoutExceeded = false;
    var timeout = 5 * 60 * 1000; // 5 minutes in ms

    function initComponent (parameters) {
      buttonToShowSfId = parameters.buttonToShowSfId;
      sfCORE.getInstance().init({
        endpoint: parameters.apiEndpoint
      });

      // Add the onclick event
      var button = document.getElementById(buttonToShowSfId);
      button.setAttribute("onclick",
        "sfUI.getInstance().showSF();");
    }

    function showSF () {
      if (!authManager.getInstance().isEnabled()) return; // If there isn't an user logged in, SF won't work

      var data = JSON.parse(localStorage.userData);
      sfCORE.getInstance().selectDialog(ctzSelected, simplificationSelected, timeoutExceeded, data.userId);
    }

    function isTimeExceeded (timeMs) {
      if (timeMs > timeout)
        timeoutExceeded = true;

      return timeoutExceeded;
    }

    return {
      init: initComponent,
      isTimeExceeded: isTimeExceeded,
      showSF: showSF
    };
  }

  return {
    getInstance: function () {
      if (!instance) instance = Singleton();
      return instance;
    }
  };
})();
