// Log User Interface (log-ui.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the functionality related to the User Interface of 
// the Log component. The main functionality is to hook and log the main events 
// through the calls to the server side of the corresponding Log instance
// - It uses the methods implemented in log-core.js
// - Used by ctz-ui.js
// - The Log server side code is available in:
//              https://github.com/SIMPATICOProject/logs
//-----------------------------------------------------------------------------

var logUI = (function () {
  var instance; // Singleton Instance of the UI component
  var featureEnabled = true;
  function Singleton () {
    // Internal usage variables
    var paragraphs = []; // Used to store all the tagged paragraphs
    var originalStyles = []; // Used to store the tagged paragraphs CSSstyles
    var diagramContainer; // Used to show the CPD diagram

    // Component-related methods and behaviour
    function initComponent(parameters) {
      logCORE.getInstance().init({
          endpoint: parameters.endpoint
        });
    }

    // It logs an event caused when a user uses a Simpatico feature.
    // - component: Component which produces the event (e.g. tae, wae, ctz...)
    // - element: Id of the element that causes the event (e.g. paragraphID...)
    // - event: Id of the element that causes the event (e.g. paragraphID...)
    // - details: Optional parameter to pass additional info if it is required
    function logSimpaticoEvent(component, element, event, details) {
      logCORE.getInstance().logSimpaticoEvent(component, element, event, details);
    }

    // TODO: HIB - Complete it
    // It logs an event caused when a user uses interacts with a hooked element.
    // - element: Id of the element that causes the event (e.g. paragraphID...)
    // - details: Optional parameter to pass additional info if it is required
    function logTimeEvent(element, details) {
      logCORE.getInstance().logTimeEvent(element, details);
    }



    return {
      // Public definitions
      init: initComponent, // Called only one time
      enable: enableComponentFeatures,  // Called when the Component button is enabled
      disable: disableComponentFeatures, // Called when the Component button is disabled or another one enabled
      isEnabled: function() { return featureEnabled;}, // Returns if the feature is enabled

      logSimpaticoEvent: logSimpaticoEvent,
      logTimeEvent: logTimeEvent
    };
  }
  
  return {
    getInstance: function() {
      if(!instance) instance = Singleton();
      return instance;
    }
  };
})();