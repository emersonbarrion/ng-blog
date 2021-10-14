import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BlogState } from 'src/app/state/blog.state';
import { initialState } from 'src/app/testing.utils';

import { DisplayArticlesComponent } from './display-articles.component';

describe('DisplayArticlesComponent', () => {
    let component: DisplayArticlesComponent;
    let fixture: ComponentFixture<DisplayArticlesComponent>;
    let store: MockStore<BlogState>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayArticlesComponent],
            providers: [
                provideMockStore({ initialState })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayArticlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
