import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BlogState } from '../state/blog.state';
import { logoutUser } from '../state/user/user.actions';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let store: MockStore<BlogState>;
    const initialState = {
        user: {
            user: {
                id: "1",
                username: "admin",
                token: "a.b.c"
            },
            articles: [],
            article: {}
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [provideMockStore({ initialState })],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should provide the user info when user is logged in', () => {
        expect(component.user).toEqual({
            id: "1",
            username: "admin",
            token: "a.b.c"
        });
    });

    it('should dispatch `logoutUser` when onLogout is triggered', () => {
        spyOn(store, 'dispatch');
        component.onLogout();
        expect(store.dispatch).toHaveBeenCalledWith(logoutUser());
    });
});
