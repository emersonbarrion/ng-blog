import { createAction, props } from "@ngrx/store";
import { ArticleEntity } from "./article.model";

export const getArticles = createAction(
    '[Articles] Get Articles',
    props<{ userId: number | undefined }>()
);

export const getArticlesSuccess = createAction(
    '[Articles] Get Articles Success',
    props<{ articles: ArticleEntity[] }>()
);

export const getArticlesFailed = createAction(
    '[Articles] Get Articles Failed',
    props<{ userId: number | undefined, error: string }>()
);