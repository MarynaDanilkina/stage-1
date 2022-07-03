export interface ISourcesAll {
    status: string;
    sources?: ISources[];
    totalResults?: number;
    articles?: IArticles[];
}
export interface IArticles {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
}
export type Source = {
    id: string;
    name: string;
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
