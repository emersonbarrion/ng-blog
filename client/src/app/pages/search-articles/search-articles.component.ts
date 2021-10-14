import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getArticles } from 'src/app/state/articles/articles.actions';
import { selectFeatureArticles } from 'src/app/state/articles/articles.selectors';
import { BlogState } from 'src/app/state/blog.state';
import { ArticleEntity } from '../../state/articles/article.model';

@Component({
    selector: 'blog-search-articles',
    templateUrl: './search-articles.component.html',
    styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {
    articles: ArticleEntity[] = [];
    searchArticleForm = new FormGroup({
        searchInput: new FormControl(''),
    });

    constructor(private store$: Store<BlogState>) { }

    ngOnInit() {
        this.store$.dispatch(getArticles({ id: "", title: "", userName: "", userId: "" }));
        this.store$.pipe(
            select(selectFeatureArticles),
            filter(state => !!state),
        ).subscribe(state => this.articles = Object.values(state));
    }

    onSearchField(field: string) {
        let params = { id: "", title: "", userName: "", userId: "" };
        if (field === 'id') {
            params = { ...params, id: this.searchArticleForm.get('searchInput')?.value };
        }
        if (field === 'title') {
            params = { ...params, title: this.searchArticleForm.get('searchInput')?.value };
        }
        if (field === 'author') {
            params = { ...params, userName: this.searchArticleForm.get('searchInput')?.value };
        }
        this.store$.dispatch(getArticles(params));
    }

    trackById(_: number, article: ArticleEntity): number {
        return article.id;
    }
}
