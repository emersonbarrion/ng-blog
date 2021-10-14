import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ArticleEntity } from 'src/app/state/articles/article.model';
import { getArticle } from 'src/app/state/articles/articles.actions';
import { selectFeatureArticle } from 'src/app/state/articles/articles.selectors';
import { BlogState } from 'src/app/state/blog.state';

@Component({
    selector: 'app-display-article',
    templateUrl: './display-article.component.html',
    styleUrls: ['./display-article.component.scss']
})
export class DisplayArticleComponent implements OnInit {

    slug = "";
    article: ArticleEntity = {} as ArticleEntity;

    constructor(private store$: Store<BlogState>, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        const slug = this.route.snapshot.paramMap.get('slug') || "";
        this.slug = slug;

        this.store$.dispatch(getArticle({ slug }));
        this.store$.pipe(
            select(selectFeatureArticle),
            filter(state => !!state),
        ).subscribe(state => this.article = state);
    }

    onEdit() {
        this.router.navigate(['/edit-article']);
    }
}
