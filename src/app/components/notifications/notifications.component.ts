import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {Store} from "@ngrx/store";
import {loggedUserDetails} from "../../ngRxState/userDetails.selectors";
import {concatMap, Subscription} from "rxjs";
import {userNotificationsFeatureSelector} from "../../ngRxState/notifications.selectors";
import {Notification} from "../../models/notification";
import {notificationsActions} from "../../ngRxState/notifications.actions";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy{


  notifications: Notification[]=[];
  notificationsSub: Subscription;

  usernameUser: string;
  thereAreNoNotifications: boolean= true;
  constructor(private notificSrv: NotificationsService, private store: Store) {
  }


  /*prende dallo store le notifiche dello user e setta thereAreNoNotifications concordemente*/
  ngOnInit(): void {
    this.notificationsSub= this.store.select(userNotificationsFeatureSelector).subscribe(res=>{
    this.notifications=res;
    if(this.notifications.length>0) this.thereAreNoNotifications=false;
    })
    this.usernameUser= JSON.parse(localStorage.getItem('user')).username;
  }

  deleteAllNotifications(){
    this.store.dispatch(notificationsActions.deletenotifications({notification: this.notifications}));
    this.notificSrv.deleteNotifications(this.usernameUser).subscribe(res=>{
    console.log("response of BE at deleteNotificationsUser: ", res);
    })
  }

  refreshNotifications(){
    this.notificSrv.getNotificationsByUsername(this.usernameUser).subscribe(res=>{
      this.store.dispatch(notificationsActions.getnotificationsbe({notifications: res}))
    })
  }

  ngOnDestroy(): void {
  if(this.notificationsSub)this.notificationsSub.unsubscribe();
  }



}
