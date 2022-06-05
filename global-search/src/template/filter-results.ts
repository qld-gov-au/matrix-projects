import {html, render} from 'lit-html';
import {mainTemplate} from './main';
import {urlParameterMap} from '../utils/urlParameter';
import {funnelbackApiUrl} from '../utils/constants'

export function filterResultsTemplate() {
    let label: string = '';
    const currUrlParameterMap = urlParameterMap();
    let labelFromSession = sessionStorage.getItem('fcLabel');
    let profileFromSession = sessionStorage.getItem('fcProfile');
    let scopeFromSession = sessionStorage.getItem('fcScope');
    let capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

        let applyFilter = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            const params = new URLSearchParams(location.search);
            const selectedRadioBtn = document.querySelector('input[name="filterBy"]:checked');
            params.set('scope', selectedRadioBtn?.getAttribute('data-scope') || '');
            params.set('profile', selectedRadioBtn?.getAttribute('data-profile') || '');
            // @ts-ignore
            params.set('filter', true);
            // window.location.search = params.toString();
            const fetchData = async () => {
                const response = await fetch(`${funnelbackApiUrl + '?'+ params.toString()}`);
                return await response.json()
            }
            fetchData().then(data => {
                render(mainTemplate(data?.response, currUrlParameterMap), document.getElementById('qg-search-results__container') as HTMLBodyElement);
                // handleActiveClass(e);
                console.log(data);
            });
        }
        let onFilterChange = (e: any) => {
            let selectedVal = e.target.value
            switch (selectedVal) {
                case 'qld':
                case 'custom':
                    sessionStorage.setItem(`rcSelectedRadiobutton`, selectedVal);
                    break;
                }
        }

        if(labelFromSession){
            label = capitalizeFirstLetter(labelFromSession);
        } else if(scopeFromSession) {
            // @ts-ignore
            label = html `Results from <strong>${scopeFromSession}</strong>`;
        } else if (profileFromSession) {
            label = capitalizeFirstLetter(profileFromSession);
        }

        return html`<div class="qg-filter-by-results">
                  <p class="qg-filter-by-results__title">Filter results by</p>
                  <form class="form qg-forms-v2 qg-filter-by-results__form">
                  <ol class="questions pt-2">
                    <li>
                      <fieldset>
                        <legend>
                          <span class="label">Content type</span>
                        </legend>
                        <ol class="choices qg-forms-v2__radio">
                          <li>
                            <input checked name="filterBy" id="customOption" type="radio" value="custom"
                                   data-scope="${scopeFromSession}" 
                                   data-profile="${profileFromSession}"
                                   data-label="${labelFromSession}" @click="${onFilterChange}" />
                            <label for="customOption">${label}</label>
                          </li>
                          <li>
                            <input name="filterBy" id="qld" type="radio" value="qld" data-profile='qld' data-scope='' @click="${onFilterChange}" ?checked=${sessionStorage.getItem('rcSelectedRadiobutton') === 'qld'}/>
                            <label for="qld">all Queensland Government</label>
                          </li>
                        </ol>
                      </fieldset>
                    </li>
                  </ol>
                </form>
                <button type="button" class="qg-btn qg-btn__filter btn-primary mb-2" @click="${applyFilter}">Apply filters</button>
               </div>`
}
