export type ArticlesState = {
    articles: ArticleEntity[];
    isBusy: boolean;
};

export type ArticleEntity = {
    id: number;
    userId: number;
    title: string;
    body: string;
};