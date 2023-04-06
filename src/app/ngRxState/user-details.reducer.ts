import { createReducer, on } from '@ngrx/store';
import {UserDetails} from "../models/models";
import {uDetailSAPIActions} from "./userDetails.actions";

export const userDetailsFeatureKey = 'userDetails';
export const initialState: UserDetails[] = [];

export const userDetailsReducer = createReducer(
  initialState,
  on(uDetailSAPIActions.retrievealluserdetails, (state, {details})=> {return details;})
);

