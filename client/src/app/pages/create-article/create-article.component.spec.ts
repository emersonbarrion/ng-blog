import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createArticle } from 'src/app/state/articles/articles.actions';
import { initialState, mockUserService } from 'src/app/testing.utils';

import { CreateArticleComponent } from './create-article.component';
import { BlogState } from 'src/app/state/blog.state';

describe('CreateArticleComponent', () => {
    let component: CreateArticleComponent;
    let fixture: ComponentFixture<CreateArticleComponent>;
    let store: MockStore<BlogState>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateArticleComponent],
            providers: [
                mockUserService,
                provideMockStore({ initialState })
            ]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(CreateArticleComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch `createArticle` when onSubmit is triggered', () => {
        spyOn(store, 'dispatch');
        component.createArticleForm.get('title')?.setValue('New Article');
        component.createArticleForm.get('body')?.setValue('This is the body of the article');

        component.onSubmit();

        const article = {
            userId: '1',
            userName: 'admin',
            title: 'New Article',
            body: 'This is the body of the article'
        };
        expect(store.dispatch).toHaveBeenCalledWith(createArticle({ article }));
    });
});
