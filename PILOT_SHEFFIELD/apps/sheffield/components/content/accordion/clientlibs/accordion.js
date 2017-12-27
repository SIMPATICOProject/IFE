$(document).ready(function(){
    $('.scc_dynamic-info').each(function() {
        if(!$(this).find('div.scc_container').hasClass('scc_show')){
            $(this).find('div.scc_container').addClass('scc_hide');
        }
    });

    $('.scc_dynamic-info').on('click','a.scc_cta',function(e) {  
      e.preventDefault();
      $(this).toggleClass('scc_open');
      $(this).closest('.scc_dynamic-info').find('div.scc_container').toggleClass('scc_hide');
    });
});