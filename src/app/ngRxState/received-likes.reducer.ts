import { createReducer, on } from '@ngrx/store';
import {likesAPI} from "./likes.actions";

export const receivedLikesFeatureKey = 'receivedLikes';

export const initialState:string[]=[];

export const receivedLikesReducer = createReducer(
  initialState,
  on(likesAPI.loadreceivedlikes, (state, {likes})=>likes)
);

