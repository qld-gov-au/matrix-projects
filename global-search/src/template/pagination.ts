import {html, render} from 'lit-html';
import {Response} from '../types/funnelback-data';
import {ParamMap} from '../types/url-parameters';
import {mainTemplate} from './main';
import {urlParameterMap} from '../utils/urlParameter';
import {funnelbackApiUrl} from '../utils/constants'

export function paginationTemplate(response: Response, paramMap: ParamMap) {
    const { resultPacket } = response;
    const { totalMatching } = resultPacket.resultsSummary
    let paginationOnPage = 10
    const currUrlParameterMap = urlParameterMap();
    const numberOfPages: number = Math.ceil(totalMatching / paginationOnPage);
    const start_rank_val: number = Math.floor(parseInt(String(currUrlParameterMap.startRank / 10))/10);

    const buildHref = `?query=${paramMap.query}&num_ranks=${paramMap.numRanks}&tiers=10&collection=${paramMap.collection}&profile=${paramMap.profile}&second_profile=&scope=${paramMap.scope}&label=`

    // determine pagination start value
    let pagination_start_value = function () {
        return start_rank_val * 10 + 1
    };

    // determine pagination end value
    let pagination_end_value = function () {
        var rank_val = start_rank_val * 10 + 10;
        if(numberOfPages > rank_val){
            return rank_val
        } else {
            return Math.ceil(numberOfPages);
        }
    };

    let onPageClick = (e: any) => {
        e.preventDefault();
        document.getElementById('qg-search-results')?.scrollIntoView({
            behavior: 'smooth'
        });
        history.pushState({}, '', e.target.href)
        const fetchData = async () => {
            const response = await fetch(`${funnelbackApiUrl + '?'+e.target.href.split('?')[1]}`);
            return await response.json()
        }
        fetchData().then(data => {
            // handleActiveClass(e);
            render(mainTemplate(data?.response, currUrlParameterMap), document.getElementById('qg-search-results__container') as HTMLBodyElement);
        });
    }

    function range(start: number, end: number) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    return html`<div class="pagination-container">
        <ul class="pagination">
            
            <li class="page-item">
                ${currUrlParameterMap.startRank > 1 ? html `<a class="page-link"  @click="${onPageClick}" href="${buildHref}&page=${currUrlParameterMap.activePage - 1}&start_rank=${currUrlParameterMap.startRank - 10}"><span aria-hidden="true">«</span> Previous</a>` : ''}
            </li>
            ${range(pagination_start_value(), pagination_end_value()).map(i => {
                let addParam = buildHref+`&page=${i}&start_rank=${(currUrlParameterMap.numRanks * (i - 1)) + 1}`;
                let determineActivePage = currUrlParameterMap.activePage === i ? 'active' : '';
                return html`<li class="page-item ${determineActivePage}"><a class="page-link" @click="${onPageClick}"  href=${addParam}>${i}</a></li>`
            })}
            <li class="page-item">
                ${numberOfPages > currUrlParameterMap.activePage ? html `<a class="page-link" @click="${onPageClick}" href="${buildHref}&page=${currUrlParameterMap.activePage + 1}&start_rank=${currUrlParameterMap.startRank + 10}">Next<span aria-hidden="true">&nbsp;»</span></a>` : ''}
            </li>
            
        </ul>
    </div>
  `
}