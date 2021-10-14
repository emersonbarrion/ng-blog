import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateArticleRequest } from 'src/app/state/articles/article.model';
import { createArticle } from 'src/app/state/articles/articles.actions';
import { BlogState } from 'src/app/state/blog.state';
import { UserService } from 'src/app/state/user/user.service';

@Component({
    selector: 'blog-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
    createArticleForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required])
    });

    constructor(private store$: Store<BlogState>, private userService: UserService) { }

    onSubmit() {
        const article: CreateArticleRequest = {
            userId: this.userService.authInfo.id,
            userName: this.userService.authInfo.username,
            title: this.createArticleForm.get('title')?.value,
            body: this.createArticleForm.get('body')?.value
        }

        this.store$.dispatch(createArticle({ article }));
    }

    onReset() {
        this.createArticleForm.reset();
    }
}
