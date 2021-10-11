import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { loginUser, loginUserFailed, loginUserSuccess, logoutUser } from "./user.actions";
import { UserService } from "./user.service";

@Injectable()
export class UserEffects {
    getUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginUser),
        switchMap(action => this.service.loginUser({ username: action.username, password: action.password })
            .pipe(
                map(user => {
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('username', user.username);
                    return loginUserSuccess({ user });
                }),
                catchError(_ => of(loginUserFailed({ username: action.username, error: 'Unexpected errors while fetching articles' })))
            )
        )
    ));

    isAuthenticated$ = createEffect(() => this.actions$.pipe(
        ofType(loginUserSuccess),
        tap(_ => {
            this.service.isAuthenticated = true;
        })
    ), { dispatch: false });

    logoutUser$ = createEffect(() => this.actions$.pipe(
        ofType(logoutUser),
        tap(_ => {
            localStorage.clear();
            this.service.isAuthenticated = false;
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private service: UserService,
        private router: Router
    ) { }
}