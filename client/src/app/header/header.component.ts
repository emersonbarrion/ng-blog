import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { BlogState } from '../state/blog.state';
import { logoutUser } from '../state/user/user.actions';
import { UserEntity } from '../state/user/user.model';
import { selectFeatureUser } from '../state/user/user.selectors';

@Component({
    selector: 'blog-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: UserEntity = {
        id: "",
        username: "",
        token: ""
    };

    constructor(private store$: Store<BlogState>) { }

    ngOnInit(): void {
        this.store$.pipe(
            select(selectFeatureUser),
            filter(state => !!state),
        ).subscribe(state => this.user = state);
    }

    onLogout() {
        this.store$.dispatch(logoutUser());
    }

}
