// Imports
import { isDevelopment, sendXHR, findLink, generateLoader } from "../../../lib/utils";

(function(){
    'use strict';

    document.addEventListener("DOMContentLoaded", function() {

        if(isDevelopment()) {
            salvattore.rescanMediaQueries();
        }

    });

}());
