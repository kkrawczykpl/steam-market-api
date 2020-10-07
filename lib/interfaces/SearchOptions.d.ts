interface SearchOptions {
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
