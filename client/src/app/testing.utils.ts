import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./state/user/user.service";

export const initialState = {
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

export const mockUserService = {
    provide: UserService, useValue: {
        authInfo: { id: '1', username: 'admin' }
    }
};

export const mockActivatedRoute = {
    provide: ActivatedRoute, useValue: {
        snapshot: { paramMap: { get: () => "" } }
    }
};

export const mockRouter = {
    provide: Router, useValue: {
        navigate: () => { }
    }
};