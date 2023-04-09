import{createSelector, createFeatureSelector} from "@ngrx/store";
import {Notification} from "../models/notification";
export const userNotificationsFeatureSelector= createFeatureSelector<Notification[]>('notifications');


/*
* ritorna true se ci sono notifiche non visualizzate,
* false altrimenti*/
export const areThereNotVisualizedNotificationsSelector= createSelector(
  userNotificationsFeatureSelector,
  notifications=>notifications.filter(n=>!n.visualized).length>0
  )
