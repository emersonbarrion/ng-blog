import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { createArticle, createArticleFailed, createArticleSuccess, getArticle, getArticleFailed, getArticles, getArticlesFailed, getArticlesSuccess, getArticleSuccess, updateArticle, updateArticleFailed, updateArticleSuccess } from "./articles.actions";
import { ArticlesService } from "./articles.service";

@Injectable()
export class ArticlesEffects {
    getArticles$ = createEffect(() => this.actions$.pipe(
        ofType(getArticles),
        switchMap(action => this.service.getArticles({ id: action.id, title: action.title, userName: action.userName, userId: action.userId })
            .pipe(
                map(articles => getArticlesSuccess({ articles })),
                catchError(_ => of(getArticlesFailed({ userId: action.userId, error: 'Unexpected errors while fetching articles' })))
            )
        )
    ));

    createArticle$ = createEffect(() => this.actions$.pipe(
        ofType(createArticle),
        switchMap(action => this.service.createArticle(action.article)
            .pipe(
                map(article => createArticleSuccess({ article })),
                catchError(_ => of(createArticleFailed({ article: action.article, error: 'Unexpected errors while creating article' })))
            )
        )
    ));

    createArticleSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(createArticleSuccess),
        tap(action => this.router.navigateByUrl(`/articles/${action.article.slug}`))
    ), { dispatch: false });

    getArticle$ = createEffect(() => this.actions$.pipe(
        ofType(getArticle),
        switchMap(action => this.service.getArticle(action.slug)
            .pipe(
                map(article => getArticleSuccess({ article })),
                catchError(_ => of(getArticleFailed({ slug: action.slug, error: 'Unexpected errors while fetching article' })))
            )
        )
    ));

    updateArticle$ = createEffect(() => this.actions$.pipe(
        ofType(updateArticle),
        switchMap(action => this.service.updateArticle(action.article)
            .pipe(
                map(article => updateArticleSuccess({ article })),
                catchError(_ => of(updateArticleFailed({ article: action.article, error: 'Unexpected errors while creating article' })))
            )
        )
    ));

    updateArticleSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(updateArticleSuccess),
        tap(action => this.router.navigateByUrl(`/articles/${action.article.slug}`))
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private service: ArticlesService,
        private router: Router
    ) { }
}