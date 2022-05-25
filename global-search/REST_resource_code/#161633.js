// ASSET ID -> #161633

// API URL -> %globals_asset_attribute_link_url:846%?query=%globals_get_query^unescapehtml^striphtml^rawurlencode%&num_ranks=%globals_get_num_ranks%&tiers=off&collection=%globals_get_collection%&profile=%globals_get_profile%&start_rank=%globals_get_start_rank%

var error_template = "<p>Data not found %globals_get_title%</p>";

try {
    var response_body = JSON.parse(_REST['response']['body']);
    var resultPacket = response_body['response']['resultPacket'];
    var response = response_body['response'];
    var curator = response_body['response']['curator'];

    // Handlebar helper -> highlightResult
    Handlebars.registerHelper('highlightResult', function(st) {
        var w = ['%globals_get_query%'];
        var r = new RegExp('(' + w.join('|') + ')', 'ig');
        var capitalize = function (s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1)
        };
        return capitalize(st.replace(r, '<b>$1</b>'));
    });

    // Handlebar helper -> filter title
    Handlebars.registerHelper('removeFromTitle', function(title) {
        return title.replace('| Queensland Government' , '');
    });

    // Handlebar helper -> remove '`' character funnelback returns on some search terms
    Handlebars.registerHelper('filterSearchItem', function(title) {
        return title.replace (/(^`)|(`$)/g, '');
    });

    // Get template and render template with the data
    var featured_template = '%globals_asset_contents_raw:161654^json_encode%';
    squiz.fn.renderTemplate(featured_template, curator);

    var results_template = '%globals_asset_contents_raw:161650^json_encode%';
    squiz.fn.renderTemplate(results_template, resultPacket);

    // pagination code
    var total_results = response_body['response']['resultPacket']['resultsSummary']['totalMatching'];
    if(total_results > 0){
        var number_of_pages = total_results/10;
        var get_start_rank = '%globals_get_start_rank%';
        var get_query = '%globals_get_query%';
        var get_num_ranks = '%globals_get_num_ranks%';
        var get_tiers = '%globals_get_num_ranks%';
        var get_collection = '%globals_get_collection%';
        var get_profile = '%globals_get_profile%';
        var get_second_profile = '%globals_get_second_profile%';
        var get_label = '%globals_get_label%';
        var get_scope = '%globals_get_scope%';
        var start_rank_val = parseInt(parseInt(get_start_rank/10)/10);

        // determine pagination start value
        var pagination_start_value = function () {
            return start_rank_val * 10 + 1
        };

        // determine pagination end value
        var pagination_end_value = function () {
            var rank_val = start_rank_val * 10 + 10;
            if(number_of_pages > rank_val){
                return rank_val
            } else {
                return Math.ceil(number_of_pages);
            }
        };

        // pagination template
        var pagination_template =  "<li class='page-item'><a class='page-link' href=\"?query=" +
            get_query +
            "&amp;num_ranks=" +
            get_num_ranks +
            "&amp;tiers=" +
            get_tiers +
            "&amp;collection=" +
            get_collection +
            "&amp;profile=" +
            get_profile +
            "&amp;second_profile=" +
            get_second_profile +
            "&amp;scope=" +
            get_scope +
            "&amp;label=" +
            get_label +"";

        // print pagination container
        print('<div class="pagination-container"><ul class="pagination">');

        // print pagination template if  "get_start_rank > 1"
        if (get_start_rank > 1) {
            var prevResults = parseInt(get_start_rank) - 10;
            print(
                pagination_template +
                "%&amp;start_rank=" +
                (prevResults) +
                "\"><span aria-hidden='true'>«</span> Previous </a></li>"
            );
        }

        // print pagination template if  "number_of_pages > 1"
        if (number_of_pages > 1) {
            for (var i = pagination_start_value(); i <= pagination_end_value(); i++) {
                if (Math.ceil(get_start_rank / 10) === i) {
                    print('<li class="page-item active"><a class="page-link">' + i + '</a></li>');
                } else {
                    var increment_cal = (i - 1) * 10 + 1;
                    print(
                        pagination_template +
                        "&amp;start_rank=" +
                        (increment_cal) +
                        '">' +
                        i +
                        "</a></li>"
                    );
                }
            }
            if (Math.ceil(get_start_rank / 10) !== Math.ceil(number_of_pages)) {
                var nextResults;
                if(get_start_rank){
                    nextResults = parseInt(get_start_rank) + 10
                } else {
                    nextResults = 11
                }
                print(
                    pagination_template +
                    "&amp;start_rank=" +
                    nextResults +
                    "\">Next <span aria-hidden='true'>»</span></a></a></li>"
                );
            }
        }
        // print closing element
        print('</ul></div>')
    }

} catch (e) {
    if(resultPacket && resultPacket['results'].length === 0){
        print('<p class="mt-3">No search results were found for <strong>%globals_get_query%</strong>. Please search again using a different search term in the above search box.</p>');
    } else {
        print('<p class="mt-3">Enter your query terms in the box above to search.</p>');
    }
}
