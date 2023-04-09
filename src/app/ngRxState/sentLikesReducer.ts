import { createReducer, on } from '@ngrx/store';
import {likeActions, likesAPI} from "./likes.actions";

export const likesFeatureKey = 'likes';

export const initialState: string[]=[]; //likes è l'array array degli username degli utenti likati

export const sentLikesReducer = createReducer(
  initialState,
  on(likesAPI.loaduserlikes, (state,{likes})=>likes),//carica i likes nello store dal BE

  on(likeActions.like, (state, {usernameLiked})=> [...state, usernameLiked]) //aggiunge username likato allo stato dei likes dello store
);

