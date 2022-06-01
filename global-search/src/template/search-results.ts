import type {ParamMap, Response} from '../types/funnelback-data';
import {html} from 'lit-html';
import {featuredResultsTemplate} from './featured-results';


export function searchResultsTemplate(response: Response, paginationOnPage: number, paramMap: ParamMap) {
    const { resultPacket , curator } = response;
    const { exhibits } = curator;
    const { searchTerm } = resultPacket.contextualNavigation
    const { currStart, currEnd, totalMatching } = resultPacket.resultsSummary
    const buildHref = `?query=${paramMap.query}&num_ranks=${paramMap.numRanks}&tiers=10&collection=${paramMap.collection}&profile=${paramMap.profile}&second_profile=&scope=${paramMap.scope}&label=`
    const numberOfPages = Math.ceil(totalMatching / paginationOnPage);

    return html`${exhibits.length > 0 ? featuredResultsTemplate(exhibits) : ''} <div id="qg-search-results">
    <h2 class="qg-search-results__summary">Search results for '${searchTerm}'</h2>
    <span class="qg-search-results__results-count">Showing results ${currStart} - ${currEnd} of ${totalMatching}</span>
        <ul class="qg-search-results__results-list">
            ${resultPacket.results.map((result) =>
        html`
                <li class="qg-search-results__results-list-item"><h3><a
                        href="https://find.search.qld.gov.au/s/redirect?collection=qld-gov&amp;url=https%3A%2F%2Fwww.qld.gov.au%2Fjobs&amp;auth=O56U7a56%2BWuOaUDwHIcDzQ&amp;profile=qld&amp;rank=1&amp;query=jobs">${result.title}</a>
                </h3>
                    <ul class="qg-search-results__results-list">
                        <li class="description"> ${result.metaData.C}</li>
                        <li class="meta"><span class="qg-search-results__url">${result.indexUrl}</span> - <span
                                class="file-size">${result.fileSize}</span> - <span
                                class="date-updated">${result.date}</span></li>
                    </ul>
                </li>`
    )}
        </ul>
    </div> 
    <div class="pagination-container">
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
    </div>`;
}
