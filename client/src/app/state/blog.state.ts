import { ArticlesState } from "./articles/article.model";
import { UserState } from "./user/user.model";

export interface BlogState {
    user: UserState;
    articles: ArticlesState;
}