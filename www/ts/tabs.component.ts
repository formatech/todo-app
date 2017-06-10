declare var $;

/*-----------------------------------------------------------
 | Component declaration
 | ----------------------------------------------------------
 | A component is a reusable UI control that encapsulate
 | it's own logic
 |
 | If you are finding yourself writing to much code to 
 | manage the UI most probably you need to rewrite your code 
 | in a component
 |---------------------------------------------------------*/
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