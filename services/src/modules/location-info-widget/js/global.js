(function(){

    'use strict';

     /*
     * ===========================
     * Location Info Widget Module
     * ===========================
     * This widget module deals with displaying the user's current suburb 
     * It also allows the user to manually select a suburb through a modal popup form
     * 
     */

    var qg_location_info_widget_module = (function() {

        function closeModal() {
            qg_location_info_widget.dom.$modal.modal('hide');
        }

        function shakeModalForm() {
            // Add animation class to make form shake
            qg_location_info_widget.dom.$form_wrapper.addClass("shake");

            // Clear animation
            clearTimeout(remove_shake_class_timeout);
            remove_shake_class_timeout = setTimeout(function(){ qg_location_info_widget.dom.$form_wrapper.removeClass("shake"); }, 750);
        }

        function setupModalDetectLocationButton() {

            qg_location_info_widget.dom.$detect_location_btn.click(function(event) {
                var $this = $(event.target);

                qg_user_location_module.geolocate();

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
                    shakeModalForm();

                }

            });
            
        }

        function hideSuburbList() {
            qg_location_info_widget.dom.$suburb_list_items.addClass("hidden");
            qg_location_info_widget.dom.$modal.removeClass("qg-location-info__modal--has-result");
        }

        function filterSuburbListItems(value) {

            var filtered_suburb_list_items = qg_location_info_widget.dom.$suburb_list_items.filter(function() {
                
                // Trim is because HTML might have spaces when formatting tags nicely
                return $(this).text().toLowerCase().trim().indexOf(value.toLowerCase().trim()) === 0                

            });

            return filtered_suburb_list_items;

        }

        function filterSuburbList(filter_value) {

            var filtered_suburb_list_items = filterSuburbListItems(filter_value);
            
            if (filtered_suburb_list_items.length) {
                filtered_suburb_list_items.removeClass("hidden");
                qg_location_info_widget.dom.$suburb_list_items.not(filtered_suburb_list_items).addClass("hidden");
                qg_location_info_widget.dom.$modal.addClass("qg-location-info__modal--has-result");
            } else {
                hideSuburbList();
            }

        }

        // Setup dropdown sububrb list items
        function setupSuburbListItemLinks() {

            // Can't use click because focus event happens before click
            qg_location_info_widget.dom.$suburb_list_items_links.on("mousedown", function(event) {

                var $this = $(event.target);

                var current_value = $this.text().trim();

                qg_location_info_widget.dom.$modal_input.val(current_value);

            });

            qg_location_info_widget.dom.$suburb_list_items_links.on("click", function(event) {

                event.preventDefault();
                event.stopPropagation();

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

        
        // Setup input field of modal
        function setupModalInput() {

            // On input, check how many chars in input.
            // If more than set number of characters, perform filtering of sububrb list items
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

        function setupModal() {

            // Clear field when modal is dismissed
            qg_location_info_widget.dom.$modal.on('hidden.bs.modal', function () {
                qg_location_info_widget.dom.$modal_input.val("");
                hideSuburbList();
            });

        }

        function updateLinkText(location) {

            // Set the suburb in the link
            qg_location_info_widget.dom.$link.text(location.suburb);

        }

        // When location is set by the user location module
        function updateModalInput(location) {

            // If modal is open
            if (qg_location_info_widget.dom.$modal.hasClass("show")) {

                var detected_suburb = location.suburb;
                var detected_lga = location.lga;

                // Find how many list items show with result from Google Maps API
                // This is because some LGA names from Arcgis (used in dropdown) is different from Google maps
                // e.g. Gold Coast City vs City of Gold Coast
                
                // Check detected area against list of suburb items
                var detected_area = detected_suburb + ", " + detected_lga;

                // Get filtered suburb list items
                var filtered_suburb_list_items = filterSuburbListItems(detected_area);

                // If one result, that means Arcgis and Google Maps suburb and LGA match!
                if (filtered_suburb_list_items.length === 1) {

                     // Populate input with detected sububrb
                    qg_location_info_widget.dom.$modal_input.val(detected_area).trigger("input");

                } else {

                    // Populate input with detected sububrb and focus on field
                    // Trigger input event so that sububrb list can be shown
                    qg_location_info_widget.dom.$modal_input.val(detected_suburb).trigger("input").focus();

                }

            }
            
        }

        function resetWidget() {

             // Set link back to say "Unknown"
            qg_location_info_widget.dom.$link.text("Unknown");

        }

        function subscribeToEvents() {

            qg_user_location_module.event.on("(location updated,", updateLinkText);

            qg_user_location_module.event.on("(location detected,", updateModalInput);

            qg_user_location_module.event.on("location unknown", shakeModalForm);

            qg_user_location_module.event.on("location unknown", resetWidget);

        }

        function cacheElements() {

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

        }

        function init() {
            
            qg_location_info_widget.dom = {};

            // Get root element
            qg_location_info_widget.dom.$root = $(".qg-location-info-widget");
            
            // If widget exists
            if (qg_location_info_widget.dom.$root.length) {

                subscribeToEvents();

                cacheElements();

                setupModal();

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
        
    }());

}());
