// Log Core Client (log-core.js)
//-----------------------------------------------------------------------------
// This JavaScript contains the client side of the Log component. The main 
// functionality is to log the main events through the calls to the server side 
// of the corresponding Log instance
// - It uses the methods implemented in log-core.js
// - The Log server side code is available in:
//              https://github.com/SIMPATICOProject/logs
//-----------------------------------------------------------------------------


var logCORE = (function () {
  var instance;
  function Singleton () {

    // Variables to store the used API and URL paths
    var insertLogEventAPI = '';

    // In inits the main used variables
    // In this case it generates the used API and URL paths
    // An object with an endpoint 
    function initComponent(parameters) {
      insertLogEventAPI = parameters.endpoint + '/logs/insert';
    }

    // TODO: HIB - Implement it
    function insertLogEvent(data) {
      console.warn("TO-DO: HIB Implement the log insertion in [" + insertLogEventAPI + "] ---> " + JSON.stringify(data));
    }


    // It logs an event caused when a user uses a Simpatico feature.
    // - component: Component which produces the event (e.g. tae, wae, ctz...)
    // - element: Id of the element that causes the event (e.g. paragraphID...)
    // - event: Id of the element that causes the event (e.g. paragraphID...)
    // - details: Optional parameter to pass additional info if it is required
    function logSimpaticoEvent(component, element, event, details) {
      var timestamp = new Date().getTime()
      //TODO: HIB- Implement it
      var postData = {
        "component": component, // Component which produces the event
        "element": element,
        "event": event,
        "details": details,
        "userID": "userData.userId", // the id of the logged user
        "serviceID": simpaticoEservice, // the id of the corresponding e-service
        "timestamp": timestamp
      }
      insertLogEvent(postData);
    }


    // TODO: HIB - Complete it
    // It logs an event caused when a user uses interacts with a hooked element.
    // - element: Id of the element that causes the event (e.g. paragraphID...)
    // - details: Optional parameter to pass additional info if it is required
    function logTimeEvent(element, details) {
      var timestamp = new Date().getTime()
      var postData = {
        "duration": "", // Component which produces the event
        "userID": userData.userId, // the id of the logged user
        "datatype": "duration",
        "timeForElement": element
      }
      insertLogEvent(postData);
    }

    return {
        init: initComponent,
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