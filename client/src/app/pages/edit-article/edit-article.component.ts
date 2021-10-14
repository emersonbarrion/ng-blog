import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ArticleEntity, UpdateArticleRequest } from 'src/app/state/articles/article.model';
import { updateArticle } from 'src/app/state/articles/articles.actions';
import { selectFeatureArticle } from 'src/app/state/articles/articles.selectors';
import { BlogState } from 'src/app/state/blog.state';
import { UserService } from 'src/app/state/user/user.service';

@Component({
    selector: 'blog-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
    editArticleForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required])
    });

    article: ArticleEntity = {} as ArticleEntity;

    constructor(private store$: Store<BlogState>, private userService: UserService) { }

    ngOnInit() {
        this.store$.pipe(
            select(selectFeatureArticle),
            filter(state => !!state),
        ).subscribe(state => {
            this.article = state;
            this.editArticleForm.controls['title'].setValue(this.article.title);
            this.editArticleForm.controls['body'].setValue(this.article.body);
        });
    }

    onSubmit() {
        const article: UpdateArticleRequest = {
            id: this.article.id,
            userId: this.userService.authInfo.id,
            userName: this.userService.authInfo.username,
            title: this.editArticleForm.get('title')?.value,
            body: this.editArticleForm.get('body')?.value
        }

        this.store$.dispatch(updateArticle({ article }));
    }

    onReset() {
        this.editArticleForm.reset();
    }
}
