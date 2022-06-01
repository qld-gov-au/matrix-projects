import {html} from 'lit-html';
import {ParamMap, Response} from '../types/funnelback-data';

export function paginationTemplate(response: Response, paramMap: ParamMap) {
    const { resultPacket } = response;
    const { totalMatching } = resultPacket.resultsSummary
    const paginationOnPage = 10

    const buildHref = `?query=${paramMap.query}&num_ranks=${paramMap.numRanks}&tiers=10&collection=${paramMap.collection}&profile=${paramMap.profile}&second_profile=&scope=${paramMap.scope}&label=`
    const numberOfPages = Math.ceil(totalMatching / paginationOnPage);

    return html`<div class="pagination-container">
        <ul class="pagination">
            
            <li class="page-item">
                ${paramMap.startRank > 1 ? html `<a class="page-link" href="${buildHref}&page=${paramMap.activePage - 1}&start_rank=${paramMap.startRank - 10}"><span aria-hidden="true">«</span> Previous</a>` : ''}
            </li>
            
            ${[...Array(paginationOnPage)].map((value, index) => {
                let addParam = buildHref+`&page=${index + 1}&start_rank=${paramMap.numRanks * index + 1}`;
                if(paramMap.activePage > paginationOnPage) {
                            index += paginationOnPage + 1
                 } else {
                            index += 1
                 }
                 let determineActivePage = paramMap.activePage === index ? 'active' : '';

                 return html`
                    <li class="page-item ${determineActivePage}"><a class="page-link" href=${paramMap.activePage !== index ? addParam : ''}>${index}</a>
                    </li>`
                    }
            )}
            
            <li class="page-item">
                ${numberOfPages > paramMap.activePage ? html `<a class="page-link" href="${buildHref}&page=${paramMap.activePage + 1}&start_rank=${paramMap.startRank + 10}">Next<span aria-hidden="true">&nbsp;»</span></a>` : ''}
            </li>
            
        </ul>
    </div>
  `
}
