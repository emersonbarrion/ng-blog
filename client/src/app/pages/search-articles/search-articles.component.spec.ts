import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/testing.utils';

import { SearchArticlesComponent } from './search-articles.component';

describe('SearchArticlesComponent', () => {
    let component: SearchArticlesComponent;
    let fixture: ComponentFixture<SearchArticlesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchArticlesComponent],
            providers: [provideMockStore({ initialState })]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchArticlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
