import {render} from 'lit-html';
import {mainTemplate} from '../template/main';
import {relatedResultsTemplate} from '../template/related-search';
import {urlParameterMap} from '../utils/urlParameter';

export class SearchModule {
    private spinnerEl: HTMLInputElement | null;
    private readonly siteInput: HTMLInputElement | null;
    private readonly funnelbackApiUrl: string;
    private readonly urlParameter: any;

    constructor() {
        this.urlParameter = urlParameterMap();
        this.funnelbackApiUrl = 'https://find.search.qld.gov.au/s/search.json';
        this.spinnerEl = document.querySelector(".qg-search-results__spinner");
        this.siteInput = document.querySelector('.qg-site-search__component .qg-search-site__input');
    }

    initialize() {
        let queryParam = this.urlParameter.query;
        if(queryParam){
            this.processData();
            if (this.siteInput) {
                this.siteInput.value = queryParam;
            }
        }
    }

    async fetchData() {
        this.spinnerEl?.removeAttribute('hidden');
        const response = await fetch(`${this.funnelbackApiUrl}?query=${this.urlParameter.query}&num_ranks=${this.urlParameter.numRanks}&tiers=off&collection=${this.urlParameter.collection}&profile=${this.urlParameter.profile}&scope=${this.urlParameter.scope}&start_rank=${this.urlParameter.startRank}`);
        return await response.json()
    }

    processData() {
        this.fetchData().then(data => {
            console.log(data);
            this.spinnerEl?.setAttribute('hidden', '');
            render(mainTemplate(data?.response, this.urlParameter), document.getElementById('qg-search-results__container') as HTMLBodyElement);
            render(relatedResultsTemplate(data?.response?.resultPacket?.contextualNavigation), document.getElementById('related-search__tags') as HTMLBodyElement);
        });
    }
}
