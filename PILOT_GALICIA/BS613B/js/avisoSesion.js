var loci18n = {
    "AvisoSession": {
        'id': 'AvisoSession',
        'es': 'Se recomienda guardar el borrador para no perder los cambios.',
        'gl': 'Recomendase gardar o borrador para non perder os cambios.'
    }
};

var minutosAvisoSesion = 15;

function avisoGuardado(){
  var $divPopUpTimeout = $("<div id='dialogSession' title='Aviso'><br/><p>"+ localAvisos('AvisoSession') +"</p></div>");
  $("body").append($divPopUpTimeout);
  $(function() {
    $( "#dialogSession" ).dialog({
      modal: true,
      close: function(event, ui) { 
        //$(btn_guardar).click(); 
      }
    });
  });
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function localAvisos(msgId){
    var lenguaje = GetURLParameter("idioma");
    if (lenguaje != 'gl') lenguaje = 'es';
    return loci18n[msgId][lenguaje];
}

jQuery(document).ready(function() {
    setTimeout(avisoGuardado, (minutosAvisoSesion*1000*60));
});