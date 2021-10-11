import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ArticleEntity } from "./article.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    constructor(private http: HttpClient) { }

    getArticles(userId?: number): Observable<Array<ArticleEntity>> {
        return this.http
            .get<ArticleEntity[]>(`https://jsonplaceholder.typicode.com/posts?${userId}`)
            .pipe(
                map(posts => posts || []),
                catchError(error => throwError(error))
            );
    }
}