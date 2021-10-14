import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BlogState } from 'src/app/state/blog.state';
import { initialState, mockActivatedRoute, mockRouter } from 'src/app/testing.utils';

import { DisplayArticleComponent } from './display-article.component';

describe('DisplayArticleComponent', () => {
    let component: DisplayArticleComponent;
    let fixture: ComponentFixture<DisplayArticleComponent>;
    let store: MockStore<BlogState>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayArticleComponent],
            providers: [
                provideMockStore({ initialState }),
                mockActivatedRoute,
                mockRouter,
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
