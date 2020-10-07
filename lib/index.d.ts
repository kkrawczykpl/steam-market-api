import { SearchOptions } from "./interfaces/SearchOptions";
declare class SteamMarket {
    private marketBase;
    private imageBase;
    constructor();
    search(searchOptions: SearchOptions): Promise<String[]>;
    private getQuery;
    private callMarket;
    private handle;
}
export { SteamMarket };
