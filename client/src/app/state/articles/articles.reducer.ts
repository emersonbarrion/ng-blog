import { createReducer, on } from "@ngrx/store";
import { ArticleEntity } from "./article.model";
import { getArticle, getArticles, getArticlesSuccess, getArticleSuccess, updateArticleSuccess } from "./articles.actions";

export const initialState: { articles: ArticleEntity[], article: ArticleEntity, isBusy: boolean } = {
    articles: [],
    article: {} as ArticleEntity,
    isBusy: false,
};

export const articlesReducer = createReducer(
    initialState,
    on(getArticles, (state) => ({ ...state, isBusy: true })),
    on(getArticlesSuccess, (state, { articles }) => ({ ...state, articles, isBusy: false })),
    on(getArticle, (state) => ({ ...state, article: {} as ArticleEntity })),
    on(getArticleSuccess, (state, { article }) => ({ ...state, article })),
    on(updateArticleSuccess, (state, { article }) => ({ ...state, article })),
);