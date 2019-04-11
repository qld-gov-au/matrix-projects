// Imports
import { isDevelopment, sendXHR, findLink, generateLoader } from "../../../lib/utils";

(function(){
    'use strict';


    /*
        Events
    */
    
    // Clear filters
    qg_dfv.fn.clearFilters = function(event) {
        var page_number = 1;

        // Reset filters to show placeholders
        $('.qg-search-filter__wrapper .filter__item').each(function(item_index, item) {
            $(item).find('select').val(null).trigger('change');
        });
        
        // Get all results
        qg_dfv.fn.getFilteredResults(page_number);
    };

    // Get results with filters applied
    qg_dfv.fn.handleSearchSubmit = function(event) {
        var page_number = 1;

        qg_dfv.fn.getFilteredResults(page_number);

        return false;
    };

    // Get a results page based on paginated link
    qg_dfv.fn.handleSearchPaginationClick = function(event) {
        var target_link = qg_dfv.fn.findLink(event);
        var page_number;

        // Handle previous / next
        if($(target_link).hasClass('qg-previous')) {
            // Previous 
            page_number = parseInt(target_link.getAttribute('data-current'));
        } else if($(target_link).hasClass('qg-next')) {
            // Next
            page_number = parseInt(target_link.getAttribute('data-current')) + 2;
        } else {
            // Standard
            page_number = target_link.getAttribute('data-page');
        }

        qg_dfv.fn.getFilteredResults(page_number);

        return false;
    };
    
    // Get results with filters applied
    qg_dfv.fn.getFilteredResults = function(page_number) {
        var rest_config = $('#display-filter-data__config');
        var results_url = rest_config.attr('data-rest');
        
        // Add onto the request URL
        results_url += '?template_type=results';
        results_url += '&new_root=' + rest_config.attr('data-root');
        results_url += '&template_source=' + rest_config.attr('data-template');
        results_url += '&results_per_page=' + rest_config.attr('data-per-page');
        results_url += '&result_pages=' + rest_config.attr('data-pages');
        results_url += '&page=' + page_number;
        
        // Add filters
        $('.qg-search-filter__wrapper .filter__item').each(function(item_index, item) {
            var filter_name = $(item).attr('data-filter');
            var filter_value = $(item).find('select').val();
            
            results_url += '&' + filter_name + '=' + filter_value;
        });
        
        var xhr_parameters = {
            'request_url': results_url,
            'request_extras': '',
            'request_success': qg_dfv.fn.loadFilteredResults,
            'request_failure': qg_dfv.fn.failedRequest
        };

        var loader = generateLoader();

        if(isDevelopment()) {
            /* Local */
            var all_content = $('.qg-rest__wrapper').html();
            $('.qg-rest__wrapper').html(loader);

            // Emulate loading results for development
            setTimeout(function(){
                qg_dfv.fn.loadFilteredResults(all_content);
            }, 5000);
        } else {
            /* Production */
            // Fetch results
            $('.qg-rest__wrapper').html(loader);
            sendXHR(xhr_parameters, 'GET');
        }
        
        return false;
    };
    
    // Load results
    qg_dfv.fn.loadFilteredResults = function(response) {
        var default_title = 'All support services';
        var results_title = 'Support services for ';
        var selected_values = [];

        $('.qg-rest__wrapper').html(response);

        // Update results title
        $('.qg-search-filter__wrapper .filter__item').each(function(item_index, item) {
            var filter_value = $(item).find('select').val();
            
            if(filter_value !== '' && filter_value !== 'All') {
                selected_values.push(filter_value);
            }
        });

        if(selected_values.length === 0) {
            results_title = default_title;
        } else {
            results_title += selected_values.join(', ');
        }

        $('.qg-search-results__wrapper h2').text(results_title);

        if(!isDevelopment()) {
            // Invoke Salvattore for masonry layout
            var grid = document.querySelector('.qg-search-results__list');
            salvattore.registerGrid(grid);
        }
    };


    /*
        Functions
    */
    
    // Initialise Select2 plugin for filters
    qg_dfv.fn.initFilterSelects = function() {
        $('.qg-search-filter__wrapper .filter__item').each(function(item_index, item) {
            var placeholder = $(item).find('label').text();
            
            $(item).find('select').select2({
                'placeholder': placeholder
            });
        });
    };
    
    
    /*
        Ready
    */
    
    $(document).ready(function() {
        qg_dfv.fn.initFilterSelects();

        if(isDevelopment()) {
            // Refresh grid for viewpoint change, as JS runs before styles are injected
            var grid = document.querySelector('.qg-search-results__list');
            salvattore.recreateColumns(grid);
        }

        // Binds
        $('body').on('click', '.qg-search-filter__wrapper button[type="submit"]', qg_dfv.fn.handleSearchSubmit);
        $('body').on('click', '.qg-search-filter__wrapper button[type="reset"]', qg_dfv.fn.clearFilters);
        $('body').on('click', '.qg-search-results__pagination .page-link', qg_dfv.fn.handleSearchPaginationClick)
    });
}());
