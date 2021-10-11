import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogState } from './state/blog.state';
import { loginUserSuccess } from './state/user/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private store$: Store<BlogState>) { }

    ngOnInit() {
        if (localStorage.getItem('id') && localStorage.getItem('username') && localStorage.getItem('token')) {
            const user = {
                id: localStorage.getItem('id') || "",
                username: localStorage.getItem('username') || "",
                token: localStorage.getItem('token') || ""
            };

            this.store$.dispatch(loginUserSuccess({ user }));
        }
    }
}
