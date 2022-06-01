import {render} from 'lit-html';
import {mainTemplate} from './template/main';
import {relatedResultsTemplate} from './template/related-search';

class SearchResults {
    private spinnerEl: HTMLInputElement | null;
    private readonly siteInput: HTMLInputElement | null;
    private urlParams;

    constructor() {
        this.spinnerEl = document.querySelector(".qg-search-results__spinner");
        this.siteInput = document.querySelector('.qg-site-search__component .qg-search-site__input');
        this.urlParams = new URLSearchParams(window.location.search);
    }

    parameterMap() {
        return {
            query : this.urlParams.get('query') || '',
            profile : this.urlParams.get('profile') || '',
            label : this.urlParams.get('label') || '',
            filter : this.urlParams.get('filter') || '',
            numRanks : parseInt(this.urlParams.get('num_ranks') as string) || 0,
            startRank : parseInt(this.urlParams.get('start_rank') as string) || 1,
            collection : this.urlParams.get('collection') || '',
            scope : this.urlParams.get('scope') || '',
            activePage : parseInt(this.urlParams.get('page') as string) || 1,
        };
    }

    initialize() {
        let queryParam = this.parameterMap().query;
        if(queryParam){
            this.processData();
            if (this.siteInput) {
                this.siteInput.value = queryParam;
            }
        }
    }

    async fetchData() {
        let params = this.parameterMap();
        this.spinnerEl?.removeAttribute('hidden');
        const response = await fetch(`https://find.search.qld.gov.au/s/search.json?query=${params.query}&num_ranks=${params.numRanks}&tiers=off&collection=${params.collection}&profile=${params.profile}&scope=${params.scope}&start_rank=${params.startRank}`);
        return await response.json()
    }

    processData() {
        this.fetchData().then(data => {
            console.log(data);
            this.spinnerEl?.setAttribute('hidden', '');
            render(mainTemplate(data?.response, this.parameterMap()), document.getElementById('qg-search-results__container') as HTMLBodyElement);
            render(relatedResultsTemplate(data?.response?.resultPacket?.contextualNavigation), document.getElementById('related-search__tags') as HTMLBodyElement);
        });
    }


}

const searchResults = new SearchResults();
searchResults.initialize();

