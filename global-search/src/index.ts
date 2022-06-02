import {FilterModule} from './modules/FilterModule';
import {SearchModule} from './modules/SearchModule';


const filterComponent = new FilterModule();
const searchResults = new SearchModule();
searchResults.initialize();
