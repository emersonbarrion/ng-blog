import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getArticles } from 'src/app/state/articles/articles.actions';
import { selectFeatureArticles } from 'src/app/state/articles/articles.selectors';
import { BlogState } from 'src/app/state/blog.state';
import { ArticleEntity } from '../../state/articles/article.model';

@Component({
    selector: 'blog-display-articles',
    templateUrl: './display-articles.component.html',
    styleUrls: ['./display-articles.component.scss']
})
export class DisplayArticlesComponent implements OnInit {
    articles: ArticleEntity[] = [];

    constructor(private store$: Store<BlogState>) { }

    ngOnInit() {
        this.store$.dispatch(getArticles({ id: "", title: "", userName: "", userId: "" }));
        this.store$.pipe(
            select(selectFeatureArticles),
            filter(state => !!state),
        ).subscribe(state => this.articles = Object.values(state));
    }

    trackById(_: number, article: ArticleEntity): number {
        return article.id;
    }
}
