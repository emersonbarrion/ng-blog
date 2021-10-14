import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoginRequest, UserEntity } from "./user.model";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

    isAuthenticated = false;
    authInfo = {
        id: localStorage.getItem('id') || "",
        username: localStorage.getItem('username') || "",
        token: localStorage.getItem('token') || ""
    };

    constructor(private http: HttpClient) { }

    loginUser(body: LoginRequest): Observable<UserEntity> {
        return this.http
            .post<UserEntity>('/api/auth/login', body)
            .pipe(
                tap(user => {
                    this.authInfo.id = user.id;
                    this.authInfo.username = user.username;
                    this.authInfo.token = user.token;
                }),
                catchError(error => throwError(error))
            );
    }
}