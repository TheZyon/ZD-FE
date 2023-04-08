import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {Store} from "@ngrx/store";
import {loggedUserDetails} from "../../ngRxState/userDetails.selectors";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy{



  constructor(private notificSrv: NotificationsService, private store: Store) {
  }

  ngOnInit(): void {
  this.store.select(loggedUserDetails)
    .pipe(
      concatMap(res=> this.notificSrv.getNotificationsByUsername(res.username))
    )
    .subscribe(notifications=>{

    })


  }


  ngOnDestroy(): void {
  }



}
