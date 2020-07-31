interface SearchOptions {
    // eg. https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=578080&norender=1&count=500
    query: string;
    appid: number;
    count?: number;
    start?: number;
    sort_column?: 'price' | 'quantity';
    sort_dir?: 'asc' | 'desc';
    search_descriptions?: 1 | 0;
    norender?: 1 | 0;

    [key: string]: any;
}

export { SearchOptions };