$(function () {
	
    $('div.scc_service-info h2').each(function() {
      $(this).addClass('scc_icon-chevron-down');
    });

    $('div.scc_service-info ul, div.scc_service-info p').each(function() {
      $(this).addClass('scc_hide');
	});    

    $('div.scc_service-info h2').unbind().on('click',function(e) {
      e.preventDefault();
      $(this).toggleClass('scc_hide');
      $(this).closest('div.scc_col').find('ul, p').toggleClass('scc_hide');
      $(this).toggleClass('scc_icon-chevron-down scc_icon-chevron-up');
    });

});