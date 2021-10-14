import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
import { UserService } from './state/user/user.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: any, next: any) {
        const user = this.injector.get(UserService);
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'token ' + user.authInfo.token)
        })

        return next.handle(authRequest);
    }
}