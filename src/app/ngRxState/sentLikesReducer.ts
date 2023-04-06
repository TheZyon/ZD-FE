import { createReducer, on } from '@ngrx/store';
import * as LikesActions from './likes.actions';
import {likeActions, likesAPI} from "./likes.actions";
import {state} from "@angular/animations";

export const likesFeatureKey = 'likes';

export interface State {

}

export const initialState: string[]=[]; //likes è l'array array degli username degli utenti likati

export const sentLikesReducer = createReducer(
  initialState,
  on(likesAPI.loaduserlikes, (state,{likes})=>likes),//carica i likes nello store dal BE

  on(likeActions.like, (state, {usernameLiked})=>{return [...state, usernameLiked];}) //aggiunge username likato allo stato dei likes dello store
);

