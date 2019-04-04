(function(){
    'use strict';

    
    /*
        Functions
    */
    
    // Initialise Select2 plugin for filters
    qg_dfv.fn.initFilterSelects = function() {
        $('.qg-search-filter__wrapper .filter__item').each(function(item_index, item) {
            var placeholder = $(item).find('span').text();
            
            $(item).find('select').select2({
                'placeholder': placeholder
            });
        });
    };
    
    // Clear filters
    qg_dfv.fn.clearFilters = function(event) {
        // Reset filters to show placeholders
        $('.qg-search-filter__wrapper .filter__item').each(function(item_index, item) {
            $(item).find('select').val(null).trigger('change');
        });
        
        // Get all results
        qg_dfv.fn.getFilteredResults(event);
    };
    
    // Get results with filters applied
    qg_dfv.fn.getFilteredResults = function(event) {
        var rest_config = $('#display-filter-data__config');
        var results_url = rest_config.attr('data-rest');
        var results_root = rest_config.attr('data-root');
        var results_template = rest_config.attr('data-template');
        
        // Add onto the request URL
        results_url += '?template_type=results';
        results_url += '&new_root=' + results_root;
        results_url += '&template_source=' + results_template;
        
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
        }
        
        var loader = qg_dfv.fn.generateLoader();
        $('.qg-rest__wrapper').html(loader);
        
        // Fetch results
        qg_dfv.fn.sendXHR(xhr_parameters, 'POST');
        
        return false;
    };
    
    // Load results
    qg_dfv.fn.loadFilteredResults = function(response) {
        $('.qg-rest__wrapper').html(response);
        
        // Invoke Salvattore for masonry layout
        var grid = document.querySelector('.qg-search-results__list');
        salvattore.registerGrid(grid);
    };
    
    
    /*
        Ready
    */
    
    $(document).ready(function() {
        qg_dfv.fn.initFilterSelects();
        
        // Binds
        $('body').on('click', '.qg-search-filter__wrapper button[type="submit"]', qg_dfv.fn.getFilteredResults);
        $('body').on('click', '.qg-search-filter__wrapper button[type="reset"]', qg_dfv.fn.clearFilters);
    });
}());
