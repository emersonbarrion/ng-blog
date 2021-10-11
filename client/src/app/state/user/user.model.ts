export type UserState = {
    user: UserEntity;
    isBusy: boolean;
};

export type UserEntity = {
    id: string;
    username: string;
    token: string;
};

export type LoginRequest = {
    username: string;
    password: string;
}