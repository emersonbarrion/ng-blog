import { createSelector } from "@ngrx/store";
import { BlogState } from "../blog.state";
import { UserState } from "./user.model";

const selectFeature = (state: BlogState) => state.user;

export const selectFeatureUser = createSelector(
    selectFeature,
    (state: UserState) => state.user
);