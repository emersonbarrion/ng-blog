import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ArticleEntity, CreateArticleRequest, UpdateArticleRequest } from "./article.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    constructor(private http: HttpClient) { }

    getArticles(userId: string): Observable<ArticleEntity[]> {
        return this.http
            .get<ArticleEntity[]>(`/api/articles`, { params: { userId } })
            .pipe(
                map(articles => articles || []),
                catchError(error => throwError(error))
            );
    }

    createArticle(article: CreateArticleRequest): Observable<ArticleEntity> {
        return this.http
            .post<ArticleEntity>(`/api/articles`, article)
            .pipe(catchError(error => throwError(error)));
    }

    updateArticle(article: UpdateArticleRequest): Observable<ArticleEntity> {
        return this.http
            .put<ArticleEntity>(`/api/articles`, article)
            .pipe(catchError(error => throwError(error)));
    }

    getArticle(slug: string): Observable<ArticleEntity> {
        return this.http
            .get<ArticleEntity>(`/api/articles/${slug}`)
            .pipe(catchError(error => throwError(error)));
    }
}