import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoginRequest, UserEntity } from "./user.model";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

    isAuthenticated = false;

    constructor(private http: HttpClient) { }

    loginUser(body: LoginRequest): Observable<UserEntity> {
        return this.http
            .post<UserEntity>('/api/auth/login', body)
            .pipe(catchError(error => throwError(error)));
    }
}