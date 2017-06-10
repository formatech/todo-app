(function () {
    $('tabs').each(function () {
        var $tabs = $(this).find('tab');
        var selector = '#' + $(this).attr('target');

        var $pages = $(selector + ' page');

        $tabs.on('click', function () {
            var index = $(this).index();

            // hide pages and show current page
            $pages.removeClass('active');
            $($pages[index]).addClass('active');

            // remove active from tabs and add it to the current tab
            $tabs.removeClass('active');
            $($tabs[index]).addClass('active');
        });

    });
})()