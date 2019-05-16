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

        function closeModal() {
            qg_location_info_widget.dom.$modal.modal('hide');
        }

        function shakeForm() {
            // Add animation class to make form shake
            qg_location_info_widget.dom.$form_wrapper.addClass("shake");

            // Clear animation
            clearTimeout(remove_shake_class_timeout);
            remove_shake_class_timeout = setTimeout(function(){ qg_location_info_widget.dom.$form_wrapper.removeClass("shake"); }, 750);
        }

        function setupModalDetectLocationButton() {

            qg_location_info_widget.dom.$detect_location_btn.click(function(event) {
                var $this = $(event.target);

                qg_user_location_module.locateUser();

            });         

        }

        function setupModalSetLocationButton() {

            qg_location_info_widget.dom.$set_location_btn.click(function(event) {

                var current_value = qg_location_info_widget.dom.$modal_input.val();

                // Check if inputted value is at least one of the suburb list items
                // Need trim here because HTML formatting of list items may include spaces
                var selected_suburb_list_item = qg_location_info_widget.dom.$suburb_list_items.filter(function() {
                    return $(this).text().toLowerCase().trim() === current_value.toLowerCase().trim();
                });

                // If inputted value exists in the suburb list
                if (selected_suburb_list_item.length) {
                    
                    var selected_suburb_list_item_array = current_value.split(", ");

                    var selected_suburb = selected_suburb_list_item_array[0];
                    var selected_lga = selected_suburb_list_item_array[1];

                    // Emit event
                    qg_user_location_module.event.emit("area manually selected", selected_suburb, selected_lga);

                    // Dismiss the modal
                    closeModal();

                } else {
                   
                    // Shake the form to alert user
                    shakeForm();

                }

            });
            
        }

        function hideSuburbList() {
            qg_location_info_widget.dom.$suburb_list_items.hide();
            qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--has-result");
        }

        function filterSuburbList(filter_value) {

            var filtered_suburbs = qg_location_info_widget.dom.$suburb_list_items.filter(function() {
                
                // Trim is because HTML might have spaces when formatting tags nicely
                return $(this).text().toLowerCase().trim().indexOf(filter_value.toLowerCase().trim()) === 0                
                
            });
            
            if (filtered_suburbs.length) {
                filtered_suburbs.show();
                qg_location_info_widget.dom.$suburb_list_items.not(filtered_suburbs).hide();
                qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--has-result");
            } else {
                hideSuburbList();
            }

        }

        function setupSuburbListItemLinks() {

            // Can't use click because focus event happens before click
            qg_location_info_widget.dom.$suburb_list_items_links.on("mousedown", function(event) {

                var $this = $(event.target);

                var current_value = $this.text().trim();

                qg_location_info_widget.dom.$modal_input.val(current_value);

            });

            qg_location_info_widget.dom.$suburb_list_items_links.on("click", function(event) {

                var $this = $(event.target);

                $this.blur();

            });

            qg_location_info_widget.dom.$suburb_list_items_links.on("focus", function(event) {

                qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--suburb-list-item-focused");

            });

            qg_location_info_widget.dom.$suburb_list_items_links.on("blur", function(event) {

                qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--suburb-list-item-focused");

            });

        }

        function setupModalInput() {

            // On input, check how many chars in input.
            // If more than 3, perform filtering
            qg_location_info_widget.dom.$modal_input.on("input", function(event) {

                var $this = $(event.target);

                var current_value = $this.val();

                if (current_value.length > 2) {
                    filterSuburbList(current_value);
                } else {
                    hideSuburbList();
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

                // Get form wrapper
                qg_location_info_widget.dom.$form_wrapper = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-form-wrapper");

                // Get field input in modal
                qg_location_info_widget.dom.$modal_input = qg_location_info_widget.dom.$form_wrapper.find(".qg-location-info__modal-field");

                // Get suburb list items
                qg_location_info_widget.dom.$suburb_list_items = qg_location_info_widget.dom.$form_wrapper.find(".qg-location-info__modal-suburb-list-item");

                // Get suurb list item links
                qg_location_info_widget.dom.$suburb_list_items_links = qg_location_info_widget.dom.$suburb_list_items.find(".qg-location-info__modal-suburb-list-item-link");

                // Get detect location button in modal
                qg_location_info_widget.dom.$detect_location_btn = qg_location_info_widget.dom.$form_wrapper.find(".qg-location-info__modal-btn-detect-location");

                // Get set location button in modal
                qg_location_info_widget.dom.$set_location_btn = qg_location_info_widget.dom.$modal.find(".qg-location-info__modal-btn-set-location");

                setupModalInput();

                setupSuburbListItemLinks();

                setupModalDetectLocationButton();

                setupModalSetLocationButton();

            }
            
        }
        
        var qg_location_info_widget = {};

        // List to store suburb/ LGAs
        var area_list_array = [];

        var remove_shake_class_timeout;

        // Initialise this module only when the user location module is initiliased
        qg_user_location_module.event.on("user location module initialised", init);

        qg_user_location_module.event.on("location set", updateLink);

        qg_user_location_module.event.on("location set", closeModal);

        qg_user_location_module.event.on("location unknown", shakeForm);

        return {
            init: init
        }

    }());

}());
