(function(){
    'use strict';


    /*
        Events
    */

    $(document).keydown(function(event){
        // ESC key pressed
        if(event.keyCode === 27) {
            try {
                new MouseEvent('test');
                $('.qg-quick-exit__button').trigger('click');
            } catch (e) {
                qg_dfv.fn.exitWindow();
            }
        }
    });
    


    /*
        Functions
    */
    
    // Replace current window with new resource
    qg_dfv.fn.exitWindow = function() {
        var new_location = 'https://www.google.com.au';
        window.open(new_location, '_blank', '');

        setTimeout(function(){
            return window.location.replace(new_location),!1
        }, 100);
    }


    /*
        Ready
    */
    
    $(document).ready(function() {

        // IE 11 polyfill
        var sticky_elements = $('.qg-quick-exit__wrapper');
        Stickyfill.add(sticky_elements);

        // Binds
        $('body').on('click', '.qg-quick-exit__button', qg_dfv.fn.exitWindow);
    });
}());
