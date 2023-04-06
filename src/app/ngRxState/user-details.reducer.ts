import { createReducer, on } from '@ngrx/store';
import {UserDetails} from "../models/models";
import {userDetailsActions} from "./userDetails.actions";

export const userDetailsFeatureKey = 'userDetails';
export const initialState: UserDetails[] = [];

export const userDetailsReducer = createReducer(
  initialState,
  on(userDetailsActions.retrievealluserdetails, (state, {details})=> {return details;}),
  on(userDetailsActions.update, (state, {userDetails})=>{

    console.log("details received by updating reducer: ", userDetails);
    let s= state;
    s= s.filter(det=> det.username!=userDetails.username)
    return [...s, userDetails];
  } )
);

