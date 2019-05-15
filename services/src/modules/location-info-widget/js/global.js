(function(){

    'use strict';

     /*
     * ===========================
     * Location Info Widget Module
     * ===========================
     * This widget module deals with displaying the user's location and providing an interface for the user to select a location
     * 
     * ---------------------------
     * Functionality
     * ---------------------------
     * 
     * 
     */

    var qg_location_info_widget_module = (function() {

        function setupModalSetLocationButton() {

            qg_location_info_widget.dom.$set_location_btn.click(function(event) {

                var current_value = qg_location_info_widget.dom.$modal_input.val();

                var selected_suburb_list_item = qg_location_info_widget.dom.$suburb_list_items.filter(function() {
                    return $(this).text() === current_value;
                });

                if (selected_suburb_list_item.length) {
                    console.log("Yes");

                } else {
                    console.log("No");
                }

            });
            

        }

        function hideSuburbList() {
            qg_location_info_widget.dom.$suburb_list_items.hide();
            qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--has-result");
        }

        function filterSuburbList(value) {

            var lowered_case_value = value.toLowerCase();

            var filtered_suburbs = qg_location_info_widget.dom.$suburb_list_items.filter("[data-suburb*='" + lowered_case_value + "']");
            
            if (filtered_suburbs.length) {
                filtered_suburbs.show();
                qg_location_info_widget.dom.$suburb_list_items.not(filtered_suburbs).hide();
                qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--has-result");
            } else {
                hideSuburbList();
            }

        }

        function setupSuburbListItems() {

            // Can't use click because focus event happens before click
            qg_location_info_widget.dom.$suburb_list_items.mousedown(function(event){

                var $this = $(event.target);

                var current_value = $this.text();

                qg_location_info_widget.dom.$modal_input.val(current_value);

            });

        }

        function setupModalInput() {

            // On input, check how many chars in input.
            // If more than 3, perform filtering
            qg_location_info_widget.dom.$modal_input.on("input", function(event) {

                var $this = $(event.target);

                var current_value = $this.val();

                if (current_value.length > 3) {
                    filterSuburbList(current_value);
                } else {
                    hideSuburbList(current_value);
                }

            });

            qg_location_info_widget.dom.$modal_input.on("focus", function(event) {

                qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--focused");

            });

            qg_location_info_widget.dom.$modal_input.on("blur", function(event) {

                qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--focused");

            });


        }

        // When location is set, set the suburb in the link
        function updateLink(location) {
            qg_location_info_widget.dom.$link.text(location.suburb);
        }

        function init() {
            
            qg_location_info_widget.dom = {};

            // Get root element
            qg_location_info_widget.dom.$root = $(".qg-location-info-widget");
            
            // If widget exists
            if (qg_location_info_widget.dom.$root.length) {

                // Get widget link
                qg_location_info_widget.dom.$link = qg_location_info_widget.dom.$root.find(".qg-location-info-widget__link");
                
                // Get Modal
                qg_location_info_widget.dom.$modal = $("#qg-location-info__modal");

                // Get field input in modal
                qg_location_info_widget.dom.$modal_input = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-field");

                // Get suburb list items
                qg_location_info_widget.dom.$suburb_list_items = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-suburb-list-item");

                // Get detect location button in modal
                qg_location_info_widget.dom.$detect_location_btn = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-btn-detect-location");

                // Get set location button in modal
                qg_location_info_widget.dom.$set_location_btn = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-btn-set-location");

                setupModalInput();

                setupModalSetLocationButton();

                setupSuburbListItems();

            }
            
        }
        
        var qg_location_info_widget = {};

        // List to store suburb/ LGAs
        var area_list_array = [];

        // Initialise this module only when the user location module is initiliased
        qg_user_location_module.event.on("user location module initialised", init);

        qg_user_location_module.event.on("location set", updateLink);

        return {
            init: init
        }
    
    
    }());

}());
