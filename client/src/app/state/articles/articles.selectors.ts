import { createSelector } from "@ngrx/store";
import { BlogState } from "../blog.state";
import { ArticlesState } from "./article.model";

const selectFeature = (state: BlogState) => state.articles;

export const selectFeatureArticles = createSelector(
    selectFeature,
    (state: ArticlesState) => state.articles
);

export const selectFeatureArticle = createSelector(
    selectFeature,
    (state: ArticlesState) => state.article
);