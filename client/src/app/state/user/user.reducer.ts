import { createReducer, on } from "@ngrx/store";
import { UserEntity } from "./user.model";
import { loginUser, loginUserSuccess, logoutUser } from "./user.actions";

export const initialState: { user: UserEntity, isBusy: boolean } = {
    user: {
        id: "",
        username: "",
        token: ""
    },
    isBusy: false,
};

export const userReducer = createReducer(
    initialState,
    on(loginUser, (state) => ({ ...state, isBusy: true })),
    on(loginUserSuccess, (_, { user }) => ({ user, isBusy: false })),
    on(logoutUser, (_) => initialState),
);