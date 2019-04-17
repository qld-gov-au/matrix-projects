(function(){
    'use strict';

    


    /*
        Events
    */
    
    function keypressHandler(event) {
        // ESC
        if(event.keyCode === 27) {
            closeWindow();
        }
    }
    
    document.addEventListener("keydown", keypressHandler, false);


    /*
        Functions
    */
    
    // Replace current window with new resource
    function closeWindow() {
        location.replace('https://www.google.com.au');

        window.open('https://www.google.com.au', '_blank', '');
    } 


    /*
        Ready
    */

    checkForMouseEvent();
    
    $(document).ready(function() {

        // IE 11 polyfill
        var sticky_elements = $('.qg-quick-exit__wrapper');
        Stickyfill.add(sticky_elements);

        // Binds
        $('body').on('click', '.qg-quick-exit__button', closeWindow);
    });
}());
