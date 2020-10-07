import { SearchOptions } from "./interfaces/SearchOptions";
import { URLHelper } from "./helpers/url";
import { IncomingMessage } from "http";
import { get } from "https";

class SteamMarket {

    private marketBase = 'https://steamcommunity.com/market/search/render/';
    private imageBase = 'https://steamcommunity-a.akamaihd.net/economy/image/';

    constructor() {
        return this;
    }

    public search(searchOptions: SearchOptions): Promise<String[]> {
        return new Promise(( resolve, reject ) => {
            const query = this.getQuery(searchOptions);
            const url = this.marketBase + query;
            this.callMarket(url).then(resolve, reject);
        });
    }

    private getQuery(searchOptions: SearchOptions) {
        searchOptions.query = URLHelper.formatURL(searchOptions.query);
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

    private callMarket(url: string): Promise<String[]> {
        return new Promise( (resolve, reject) => {
            get(url, (res) => {
                this.handle(res).then(resolve, reject);
            });
        });   
    }

    private handle(res: IncomingMessage): Promise<String[]> {
        return new Promise( (resolve, reject) => {
            let data: string = '';
            res.on('error', () => data += '{msg: "Error!"}');
            res.on('data', (chunk: any) => data += chunk);
            res.on('end', () => {
                try {
                    const dataJson = JSON.parse(data);
                    if(!res.statusCode) {
                        return reject(new Error('Status code not received'));
                    }

                    if(res.statusCode !== 200) {
                        return reject(new Error('Bad status code: ' + res.statusCode));
                    }

                    if(dataJson.success !== true) {
                        return reject(new Error('Error occured'));
                    }

                    resolve(dataJson.results);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
}

const market = new SteamMarket();
market.search({query: "AK-47", appid: 730, start: 10}).then( (resolve) => {
    console.log(resolve);
});
export { SteamMarket };