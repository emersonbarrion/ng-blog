import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { getArticles, getArticlesFailed, getArticlesSuccess } from "./articles.actions";
import { ArticlesService } from "./articles.service";

@Injectable()
export class ArticlesEffects {
    getArticles$ = createEffect(() => this.actions$.pipe(
        ofType(getArticles),
        switchMap(action => this.service.getArticles(action.userId)
            .pipe(
                map(articles => getArticlesSuccess({ articles })),
                catchError(_ => of(getArticlesFailed({ userId: action.userId, error: 'Unexpected errors while fetching articles' })))
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private service: ArticlesService,
    ) { }
}