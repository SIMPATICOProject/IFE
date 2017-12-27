$(function () {
    var search_bar = $('.scc_site-search #scc_search'),
        results_wrapper = $('div.scc_search-suggestions'),
        results_list = $('ol', results_wrapper);

    function hide_results_list() {
        results_wrapper.removeClass('scc_show');
    }

    function show_results_list() {
        results_wrapper.addClass('scc_show');
    }

    function clear_results_list() {
        results_list.empty();
    }

    search_bar
        .on('keyup', function (e) {
            var term = search_bar.val();

            if (term.length < 3 || e.which == 27) {
                hide_results_list();
                return;
            }

            $.get('/bin/sheffield/search.suggest.json', {
                'term': term
            }).success(function (results) {
                clear_results_list();
                if (results.suggestions) {
                    
                    $(results.suggestions).each(function () {

                        var hub = this.path.replace(/[A-Za-z-]/g, '').length;
                        
                        if(hub == 4){
                            results_list.append('<li class="hubBottom" style="background:grey"><a style="color:white" href="' + this.path + '.html">' + this.title + '</a></li>');
                        }
                        else{
                            results_list.append('<li><a href="' + this.path + '.html">' + this.title + '</a></li>');
                        }

                    });
                    show_results_list();
                } else {
                    hide_results_list();
                }
                $('.hubBottom').each(function(){
                    $(this).appendTo(results_list);
                });
            });
        })
        .on('blur', function () {
            setTimeout(function () {
               hide_results_list();
            }, 1000);
        });

});