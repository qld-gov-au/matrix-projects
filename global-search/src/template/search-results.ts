import type { ResultPacket, ParamMap } from '../types/funnelback-data';
import {html} from 'lit-html';


export function searchResultsTemplate(resultPacket: ResultPacket, paginationOnPage: number, paramMap: ParamMap) {

    const {searchTerm} = resultPacket.contextualNavigation
    const {currStart, currEnd, totalMatching} = resultPacket.resultsSummary

    return html`<div id="qg-search-results">
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
                <a class="page-link" href="?query=jobs&amp;num_ranks=10&amp;tiers=10&amp;collection=qld-gov&amp;profile=qld&amp;second_profile=&amp;scope=&amp;label=%&amp;start_rank=1"><span aria-hidden="true">«</span> Previous ${paginationOnPage}</a>
            </li>
            ${[...Array(paginationOnPage)].map((value, index) => {
            let buildHref = `?query=${paramMap.query}&num_ranks=${paramMap.numRanks}&tiers=10&collection=${paramMap.collection}&profile=${paramMap.profile}&second_profile=&scope=${paramMap.scope}&active=${index}&label=&start_rank=${paramMap.numRanks * index + 1}`;
            return html`
                    <li class="page-item ${paramMap.activePage !== index ? '' : 'active'}"><a class="page-link" href=${paramMap.activePage !== index ? buildHref : ''}>${index}</a>
                    </li>`
        }
    )}
            <li class="page-item">
                <a class="page-link" href="?query=jobs&amp;num_ranks=10&amp;tiers=10&amp;collection=qld-gov&amp;profile=qld&amp;second_profile=&amp;scope=&amp;label=&amp;start_rank=21">Next ${paginationOnPage}<span aria-hidden="true">&nbsp;»</span></a>
            </li>
        </ul>
    </div>`;
}
