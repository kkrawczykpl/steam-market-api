import { SearchOptions } from "./interfaces/SearchOptions";
import { URLHelper } from "./helpers/url";

class SteamMarket {

    private marketBase = 'https://steamcommunity.com/market/search/render/';
    private imageBase = 'https://steamcommunity-a.akamaihd.net/economy/image/';
    constructor() {
        return this;
    }

    public search(searchOptions: SearchOptions): Promise<string[]> {
        return new Promise(( resolve, reject ) => {
            const query = this.getQuery(searchOptions);
            console.log(this.marketBase + query);
        });
    }

    private getQuery(searchOptions: SearchOptions) {
        searchOptions.query = URLHelper.convertSpaceToPlus(searchOptions.query);
        return URLHelper.convertSearchOptionsToQuery({
            start: 0,
            count: 50,
            sort_column: 'price',
            sort_dir: 'desc',
            search_descriptions: 0,
            norender: 1,
            ...searchOptions
        });
    }
}

let market = new SteamMarket();
market.search({ query: "AK-47", appid: 730, start: 10 });
export { SteamMarket };