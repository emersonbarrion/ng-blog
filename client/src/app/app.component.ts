import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogState } from './state/blog.state';
import { loginUserSuccess } from './state/user/user.actions';
import { UserService } from './state/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private store$: Store<BlogState>, private userService: UserService) { }

    ngOnInit() {
        if (localStorage.getItem('id') && localStorage.getItem('username') && localStorage.getItem('token')) {
            const user = this.userService.authInfo;

            this.store$.dispatch(loginUserSuccess({ user }));
        }
    }
}
