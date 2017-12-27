(function () {

    $(document).ready(function () {
        const view = $('div.scc_vimeo');
        const vimeo = $('iframe', view);

        const natural_width = vimeo.width();
        const natural_height = vimeo.height();

        const resize = function () {
            const view_width = view.width();
            const view_height = view.height();

            const v_scale = view_height / natural_height;
            const w_scale = view_width / natural_width;
            if (view_width > natural_width) {
                 top_offset = (view_height / 2) - (natural_height / 2);
                 left_offset = 0;
                vimeo.css({'transform': 'scale(' + w_scale + ')', 'top': top_offset + 'px', 'left': left_offset + 'px'});
            } else {
                 top_offset = (view_height / 2) - (natural_height / 2);
                 left_offset = (view_width / 2) - (natural_width / 2);
                vimeo.css({'transform': 'scale(' + v_scale + ')', 'top': top_offset + 'px', 'left': left_offset + 'px'});
            }
        };

        const timeout_id = setTimeout(function () {
            view.remove();
        }, 5000);

        vimeo.on('ready', function () {
            clearInterval(timeout_id);

            $(window).on('resize', resize);
            resize();

            vimeo.vimeo("play");
            $('.scc_site-intro').css({'background-image': 'none'});
        });

    });
})();