import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState, mockUserService } from 'src/app/testing.utils';

import { EditArticleComponent } from './edit-article.component';

describe('EditArticleComponent', () => {
    let component: EditArticleComponent;
    let fixture: ComponentFixture<EditArticleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditArticleComponent],
            providers: [
                provideMockStore({ initialState }),
                mockUserService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
