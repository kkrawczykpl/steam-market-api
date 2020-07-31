import { SearchOptions } from "../interfaces/SearchOptions";

class URLHelper {

    /**
     * Converts space to plus sign
     * @param url 
     * @returns space to plus 
     */
    public convertSpaceToPlus(url: string): string {
        return url.split(' ').join('+');
    }

    /**
     * Converts SearchOptions Object to query
     * e.g { appid: '730', foo: 'bar' } becomes ?appid=730&foo=bar
     * @param searchOptions (SearchOptions)
     * @returns string
     */
    public convertSearchOptionsToQuery(searchOptions: SearchOptions): string {
        const query = Object.keys(searchOptions).map((key, index) => {
            const prefix: string = (index === 0 ? '?' : '&');
            return prefix + `${key}=${searchOptions[key]}`;
        });
        return query.join('');
    }
}

const helper = new URLHelper();
export { helper as URLHelper };