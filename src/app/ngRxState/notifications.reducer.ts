import { createReducer, on } from '@ngrx/store';
import * as NotificationsActions from './notifications.actions';
import {Notification} from "../models/notification";
import {notificationsActions} from "./notifications.actions";

export const notificationsFeatureKey = 'notifications';


export const initialState: Notification[]=[];

export const notificationsReducer = createReducer(
  initialState,
  on(notificationsActions.getnotificationsbe, (state, {notifications})=>notifications),
  on(notificationsActions.makenotoificationsvisualized, (state, {notification})=>{
    let stateCopy= state;
    return stateCopy.map(notification=>{ notification.visualized=true; return notification});
  }),
  on(notificationsActions.deletenotifications, (state,{notification})=>[])
);

