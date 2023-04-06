import{ createFeatureSelector} from "@ngrx/store";
export const userLikesFeatureSelector= createFeatureSelector<string[]>('likes');

