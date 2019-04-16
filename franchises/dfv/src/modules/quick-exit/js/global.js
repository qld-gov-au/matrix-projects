(function(){
    'use strict';

    /*
        Polyfills for IE11
    */

    // MouseEvent doesn't exist in IE11
    function checkForMouseEvent() {
        try {
            new MouseEvent('test');
            return false; // No need to polyfill
        } catch (e) {
            // Need to polyfill - fall through
        }

        // Polyfills DOM4 MouseEvent
        var MouseEventPolyfill = function (eventType, params) {
            params = params || { bubbles: false, cancelable: false };
            var mouseEvent = document.createEvent('MouseEvent');
            mouseEvent.initMouseEvent(eventType, 
                params.bubbles,
                params.cancelable,
                window,
                0,
                params.screenX || 0,
                params.screenY || 0,
                params.clientX || 0,
                params.clientY || 0,
                params.ctrlKey || false,
                params.altKey || false,
                params.shiftKey || false,
                params.metaKey || false,
                params.button || 0,
                params.relatedTarget || null
            );

            return mouseEvent;
        }

        MouseEventPolyfill.prototype = Event.prototype;

        window.MouseEvent = MouseEventPolyfill;
    }

    // Needed to bypass popup blockers
    function simulateClick(elem) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        // If cancelled, don't dispatch our event
        var canceled = !elem.dispatchEvent(evt);
    }


    /*
        Events
    */
    
    function keypressHandler(event) {
        // ESC
        if(event.keyCode === 27) {
            var exit_link = document.querySelector('.qg-quick-exit__button');
            simulateClick(exit_link);
        }
    }
    
    document.addEventListener("keydown", keypressHandler, false);


    /*
        Functions
    */
    
    // Open website in a new tab
    function closeWindow() {
        window.open('https://www.google.com.au', '_blank', '');

        // Trick the browser into thinking this page was opened via code
        // This will allow you to close via script
        window.open('','_parent',''); 
        window.close();
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
