import { SearchOptions } from "../interfaces/SearchOptions";
declare class URLHelper {
    /**
     * Converts space to plus sign
     * @param url
     * @returns space to plus
     */
    formatURL(url: string): string;
    /**
     * Converts SearchOptions Object to query
     * e.g { appid: '730', foo: 'bar' } becomes ?appid=730&foo=bar
     * @param searchOptions (SearchOptions)
     * @returns string
     */
    convertSearchOptionsToQuery(searchOptions: SearchOptions): string;
}
declare const helper: URLHelper;
export { helper as URLHelper };
