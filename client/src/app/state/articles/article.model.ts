export type ArticlesState = {
    articles: ArticleEntity[];
    article: ArticleEntity;
    isBusy: boolean;
};

export type ArticleEntity = {
    id: number;
    slug: string;
    userName: string;
    userId: string;
    title: string;
    body: string;
};

export type CreateArticleRequest = {
    userName: string;
    userId: string;
    title: string;
    body: string;
}

export type UpdateArticleRequest = {
    id: number;
    userName: string;
    userId: string;
    title: string;
    body: string;
}