export type IOptions = {
    [apiKey: string]: string;
};
export interface ISourcesAll {
    status: string;
    sources?: Array<ISources>;
    totalResults?: number;
    articles?: Array<IArticles>;
}
export type IArticles = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
};
export type ISources = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};
