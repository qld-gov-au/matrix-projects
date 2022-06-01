import {html} from 'lit-html';
import {ParamMap, Response} from '../types/funnelback-data';

export function searchResultsTemplate(resultPacket: { contextualNavigation: any; resultsSummary: any; results: any; }) {
    const { currStart, currEnd, totalMatching } = resultPacket.resultsSummary
    const { searchTerm } = resultPacket.contextualNavigation

    return html`<div id="qg-search-results">
        <h2 class="qg-search-results__summary">Search results for '${searchTerm}'</h2>
        <span class="qg-search-results__results-count">Showing results ${currStart} - ${currEnd} of ${totalMatching}</span>
        <ul class="qg-search-results__results-list">
            ${resultPacket.results.map((result: any) =>
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
  `
}
