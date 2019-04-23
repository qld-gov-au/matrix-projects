// Imports
import { isDevelopment, sendXHR, findLink, generateLoader } from "../../../lib/utils";

(function(){
    'use strict';

    var grid_helplines_cards_module = (function() {

        // When the card is clicked on desktop
        function cardClicked(event) {
            
            // We depend on the z-index of the body tag to tell us what viewport user is in
            var body_zindex = $('body').css('z-index');

            // If its 3, it means that the user is in desktop
            if (body_zindex === "3") {

                // Prevent default action
                event.preventDefault();

                // Get the object that has the click event binded to
                var $this_card = $(this);

                // Get the website-link stored as data
                var this_card_website_link = $this_card.data("website-link")

                // Redirect user
                window.location.href = this_card_website_link;

            }
            
        }

        function init() {
            
            // Find grid of helplines cards 
            var $grid = $(".qg-dfv-cards--type-helplines");
            
            // If grid of helplines cards exist
            if ($grid.length) {
            
                // Find all the cards in the grid
                var $cards= $grid.find(".card");

                // For each grid
                $cards.each(function() {
                
                    var $this_card = $(this);

                    // Get this card's website link
                    var website_link = $this_card.find(".card-link__anchor").prop("href");

                    // If theres a link
                    if (website_link) {

                        // Add class so that theres a cursor on desktop
                        // Add website link as data
                        // Bind click event to handler
                        $this_card.addClass("desktop-link").data("website-link", website_link).click(cardClicked);

                    }

                });
                
            }
            
        }
        
        return {
            init: init
        }
        
    }());

    document.addEventListener("DOMContentLoaded", function() {

        if(isDevelopment()) {  
            salvattore.rescanMediaQueries();
        }

        grid_helplines_cards_module.init();

    });

}());
