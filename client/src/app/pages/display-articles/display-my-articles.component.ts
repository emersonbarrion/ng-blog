import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getArticles } from 'src/app/state/articles/articles.actions';
import { selectFeatureArticles } from 'src/app/state/articles/articles.selectors';
import { BlogState } from 'src/app/state/blog.state';
import { UserService } from 'src/app/state/user/user.service';
import { ArticleEntity } from '../../state/articles/article.model';

@Component({
    selector: 'blog-my-display-articles',
    templateUrl: './display-articles.component.html',
    styleUrls: ['./display-articles.component.scss']
})
export class DisplayMyArticlesComponent implements OnInit {
    articles: ArticleEntity[] = [];

    constructor(private store$: Store<BlogState>, private userService: UserService) { }

    ngOnInit() {
        this.store$.dispatch(getArticles({ userId: this.userService.authInfo.id }));
        this.store$.pipe(
            select(selectFeatureArticles),
            filter(state => !!state),
        ).subscribe(state => this.articles = Object.values(state));
    }

    trackById(_: number, article: ArticleEntity): number {
        return article.id;
    }
}
