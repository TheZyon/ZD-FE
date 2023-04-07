import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Like} from "../models/likes&chat";
import {urlNotifications, urlPostLike} from "../../environments/environment";
import {Notification} from "../models/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpService) { }


  /*create notification object, and send it to BE*/
  postNotification(username: string, payload:string){

    let notification:Notification={
      username:username,
      payload:payload,
      date: (new Date()).toISOString()
    }

    return this.http.post(urlNotifications, notification);
  }


}
