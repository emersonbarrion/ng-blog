import { createAction, props } from "@ngrx/store";
import { ArticleEntity, CreateArticleRequest, UpdateArticleRequest } from "./article.model";


// Get all articles
export const getArticles = createAction(
    '[Articles] Get Articles',
    props<{ userId: string }>()
);

export const getArticlesSuccess = createAction(
    '[Articles] Get Articles Success',
    props<{ articles: ArticleEntity[] }>()
);

export const getArticlesFailed = createAction(
    '[Articles] Get Articles Failed',
    props<{ userId: string, error: string }>()
);


// Create article
export const createArticle = createAction(
    '[Articles] Create Article',
    props<{ article: CreateArticleRequest }>()
);

export const createArticleSuccess = createAction(
    '[Articles] Create Article Success',
    props<{ article: ArticleEntity }>()
);

export const createArticleFailed = createAction(
    '[Articles] Create Article Failed',
    props<{ article: CreateArticleRequest, error: string }>()
);



// Get article details
export const getArticle = createAction(
    '[Articles] Get Article',
    props<{ slug: string }>()
);

export const getArticleSuccess = createAction(
    '[Articles] Get Article Success',
    props<{ article: ArticleEntity }>()
);

export const getArticleFailed = createAction(
    '[Articles] Get Article Failed',
    props<{ slug: string, error: string }>()
);



// Update article details
export const updateArticle = createAction(
    '[Articles] Update Article',
    props<{ article: UpdateArticleRequest }>()
);

export const updateArticleSuccess = createAction(
    '[Articles] Update Article Success',
    props<{ article: ArticleEntity }>()
);

export const updateArticleFailed = createAction(
    '[Articles] Get Article Failed',
    props<{ article: UpdateArticleRequest, error: string }>()
);