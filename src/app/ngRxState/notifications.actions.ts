import {createAction, createActionGroup, props} from '@ngrx/store';
import {Notification} from "../models/notification";



export const notificationsActions = createActionGroup({
  source: 'login or notification page or time interval',
  events: {
    'getNotificationsBE': props<{ notifications: Notification[] }>(), //caricare notifications dell'utente dal BE
    'makeNotoificationsVisualized': props<{notification:Notification[]}>(), //rendere tutte le notifications visualized
    'deleteNotifications':props<{notification:Notification[]}>() //eliminare tutte le notifiche dell'utente
  }
  });

