window.onload = function (){

    var logService = "https://simpatico.morelab.deusto.es/log.php";

    // Miramos si en la cookie hemos guardado algun id de usario
    var userID = value_or_null = (document.cookie.match(/^(?:.*;)?\s*simpaticoid\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
    
    // Si no, lo generamos y lo guardamos
    if (userID == null) {
      userID = uuidv4();
      document.cookie = "simpaticoid="+userID;
    }

    // var enlaceIniciar = document.getElementById('inicioSolicitudeLateralPDF');
    // enlaceIniciar.addEventListener('click', logIniciarPresentacion);

    // var enlaceIniciar2 = document.getElementById('BS607AFICHA');
    // enlaceIniciar2.addEventListener('click', logIniciarPresentacion);

    var url = window.location.href;
    
    if (url.indexOf('end')>=0) {
      sendLog(userID,'stop');
      document.cookie = 'simpaticoid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }else{
      logIniciarPresentacion(userID);
    }


    function logIniciarPresentacion(userId)
    {
        //console.log("Empezando el tema->"+userID+" "+simpaticoEservice);
        sendLog(userID, 'init');
        setInterval(function() {
            logIdleStatus(userID);
        }, 60 * 1000); // Mandamos un log cada minuto
    }

    function logIdleStatus(userID)
    {
        var timeStamp = new Date().toISOString();
        //console.log('Log de cada minuto: userID->' + userID + ' Timestamp->'+timeStamp);
        sendLog(userID, 'idle');
    }

    function sendLog(userID, status)
    {
        //console.log('Enviando->'+status+' para el usuario->'+userID);
        var request;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
          request = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
          try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
          } 
          catch (e) {
            try {
              request = new ActiveXObject('Microsoft.XMLHTTP');
            } 
            catch (e) {}
          }
        }

        var timeStamp = new Date().toISOString();

        request.open('GET', logService+'?id='+userID+'&timestamp='+timeStamp+'&status='+ status, true);
        request.send(null);
    }


    function uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    }

}
