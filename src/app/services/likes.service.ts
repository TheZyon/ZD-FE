import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Like} from "../models/likes&chat";
import {urlGetLikesByLiked, urlGetLikesByLiker, urlNotifications, urlPostLike} from "../../environments/environment";
import { Observable} from "rxjs";
import {zip} from "rxjs";
import {Notification} from "../models/notification";
import {NotificationsService} from "./notifications.service";


@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private httpSrv: HttpService, private notificationSrv: NotificationsService) {}


  //manda request al BE per creare il like di U1 a U2
  postLike(unameU1: string, unameU2:string){

    let like:Like={
      nameU1:unameU1,
      nameU2:unameU2,
      time: (new Date()).toISOString()
    }

    return zip(
      this.httpSrv.post(urlPostLike, like),
      this.notificationSrv.postNotification(unameU2,`OMG ${unameU1} liked your dog!!`));
  }

  getLikesByLiker(username:string):Observable<string[]>{
    return this.httpSrv.get<string[]>(urlGetLikesByLiker+`/${username}`)
  }
  getLikesByLiked(username:string): Observable<string[]>{
    return this.httpSrv.get<string[]>(urlGetLikesByLiked+ `/${username}`);
  }

}
