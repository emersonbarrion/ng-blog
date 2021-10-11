import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { BlogState } from 'src/app/state/blog.state';
import { loginUser } from 'src/app/state/user/user.actions';
import { selectFeatureUser } from 'src/app/state/user/user.selectors';

@Component({
    selector: 'blog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    constructor(private store$: Store<BlogState>, private router: Router) { }

    ngOnInit(): void {
        this.store$.pipe(
            select(selectFeatureUser),
            filter(state => !!state),
        ).subscribe(state => {
            if (!!state.token) {
                this.router.navigate(['/articles']);
            }
        });
    }

    onLogin() {
        this.store$.dispatch(loginUser({
            username: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value
        }));
    }

    onRegister() {
        console.log('REDIRECT TO REGISTER PAGE');
    }
}
