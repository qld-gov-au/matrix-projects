import { html, render } from 'lit-html'
import { Response } from '../types/funnelback-data'
import { ParamMap } from '../types/url-parameters'
import { mainTemplate } from './main'
import { urlParameterMap } from '../utils/urlParameter'
import { fetchData } from '../utils/fetchData'

export function paginationTemplate (response: Response, paramMap: ParamMap) {
  const { resultPacket } = response
  const { totalMatching } = resultPacket.resultsSummary
  const paginationOnPage = 10
  const currUrlParameterMap = urlParameterMap()
  const numberOfPages: number = Math.ceil(totalMatching / paginationOnPage)
  const startRankVal: number = Math.floor(parseInt(String(currUrlParameterMap.startRank / 10)) / 10)

  const buildHref = `?query=${currUrlParameterMap.query}&num_ranks=${currUrlParameterMap.numRanks}&tiers=10&collection=${currUrlParameterMap.collection}&profile=${currUrlParameterMap.profile}&second_profile=&scope=${currUrlParameterMap.scope}&label=`

  // determine pagination start value
  const paginationStartValue = function () {
    return startRankVal * 10 + 1
  }

  // determine pagination end value
  const paginationEndValue = function () {
    const rankVal = startRankVal * 10 + 10
    if (numberOfPages > rankVal) {
      return rankVal
    } else {
      return Math.ceil(numberOfPages)
    }
  }

  const onPageClick = (e: any) => {
    e.preventDefault()
    document.getElementById('qg-search-results')?.scrollIntoView({
      behavior: 'smooth'
    })
    if (e.target?.href) {
      history.pushState({}, '', e.target.href)
      fetchData(e.target?.href?.split('?')[1]).then(data => {
        render(mainTemplate(data?.response, currUrlParameterMap), document.getElementById('qg-search-results__container') as HTMLBodyElement)
      })
    }
  }

  function range (start: number, end: number) {
    return Array(end - start + 1).fill(start).map((_, idx) => start + idx)
  }

  return html`<div class="pagination-container">
        <ul class="pagination">
            
            <li class="page-item">
                ${currUrlParameterMap.startRank > 1 ? html`<a class="page-link"  @click="${onPageClick}" href="${buildHref}&page=${currUrlParameterMap.activePage - 1}&start_rank=${currUrlParameterMap.startRank - 10}"><span aria-hidden="true">«</span> Previous</a>` : ''}
            </li>
            ${range(paginationStartValue(), paginationEndValue()).map(i => {
                const addParam = buildHref + `&page=${i}&start_rank=${(currUrlParameterMap.numRanks * (i - 1)) + 1}`
                const determineActivePage = currUrlParameterMap.activePage === i ? 'active' : ''
                return html`<li class="page-item ${determineActivePage}"><a class="page-link" @click="${onPageClick}"  href=${addParam}>${i}</a></li>`
            })}
            <li class="page-item">
                ${numberOfPages > currUrlParameterMap.activePage ? html`<a class="page-link" @click="${onPageClick}" href="${buildHref}&page=${currUrlParameterMap.activePage + 1}&start_rank=${currUrlParameterMap.startRank + 10}">Next<span aria-hidden="true">&nbsp;»</span></a>` : ''}
            </li>
            
        </ul>
    </div>
  `
}
