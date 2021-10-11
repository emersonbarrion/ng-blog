import { createReducer, on } from "@ngrx/store";
import { ArticleEntity } from "./article.model";
import { getArticles, getArticlesSuccess } from "./articles.actions";

export const initialState: { articles: ArticleEntity[], isBusy: boolean } = {
    articles: [],
    isBusy: false,
};

export const articlesReducer = createReducer(
    initialState,
    on(getArticles, (state) => ({ ...state, isBusy: true })),
    on(getArticlesSuccess, (state, { articles }) => ({ articles, isBusy: false }))
);