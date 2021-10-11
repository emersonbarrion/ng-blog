import { articlesReducer } from "./articles/articles.reducer";
import { userReducer } from "./user/user.reducer";

export const blogReducer = {
    user: userReducer,
    articles: articlesReducer
};