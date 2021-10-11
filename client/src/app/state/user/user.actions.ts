import { createAction, props } from "@ngrx/store";
import { UserEntity } from "./user.model";

export const loginUser = createAction(
    '[User] Login User',
    props<{ username: string, password: string }>()
);

export const loginUserSuccess = createAction(
    '[User] Login User Success',
    props<{ user: UserEntity }>()
);

export const loginUserFailed = createAction(
    '[User] Login User Failed',
    props<{ username: string, error: string }>()
);

export const logoutUser = createAction(
    '[User] Logout User',
);

export const registerUser = createAction(
    '[User] Register User',
    props<{ username: string, password: string }>()
);

export const registerUserSuccess = createAction(
    '[User] Register User Success',
    props<{ user: UserEntity }>()
);

export const registerUserFailed = createAction(
    '[User] Register User Failed',
    props<{ id: string, username: string, error: string }>()
);