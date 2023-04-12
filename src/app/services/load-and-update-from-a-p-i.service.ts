import { Injectable } from '@angular/core';
import {interval, mergeMap, Subscription, zip} from "rxjs";
import {UserDetails} from "../models/models";
import {Notification} from "../models/notification";
import {ChatUser1User2} from "../models/likes&chat";
import {likesAPI} from "../ngRxState/likes.actions";
import {userDetailsAPIActions} from "../ngRxState/userDetailsAPIActions";
import {notificationsActions} from "../ngRxState/notifications.actions";
import {chatMessageActions} from "../ngRxState/chat-message.actions";
import {ChatMessageService} from "./chat-message.service";
import {NotificationsService} from "./notifications.service";
import {LikesService} from "./likes.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {HttpService} from "./http.service";
import {UserDetailsService} from "./user-details.service";
import {AuthData} from "../models/auth";

@Injectable({
  providedIn: 'root'
})
export class LoadAndUpdateFromAPIService {

  errorMessage: string='';
  updatingInfoFromBESub: Subscription;

  constructor(private chatSrv: ChatMessageService, private notificSrv: NotificationsService, private likeSrv: LikesService, private store: Store, private http: HttpService, private detailsSrv: UserDetailsService) { }



  doSubscribe(res: AuthData){
    this.updatingInfoFromBESub=this.updatingInfoFromBEObs(res).subscribe(
      res=>{
        this.loadInStore(res[0].content, res[1], res[2], res[3], res[4]);
      },
        error=> {
          this.errorMessage = error.message;
          alert(error.message);
        })
    }

  doUnsubscribe(){
    this.updatingInfoFromBESub.unsubscribe();
  }

  updatingInfoFromBEObs(res: AuthData){

    let AllDataObs= zip(
      this.detailsSrv.getAllUsersDetails(),
      this.likeSrv.getLikesByLiker(res.username),
      this.likeSrv.getLikesByLiked(res.username),//1.
      this.notificSrv.getNotificationsByUsername(res.username), //2.
      this.chatSrv.getAllMessagesOfUser())

    return interval(3000).pipe(
      mergeMap(i=>AllDataObs))

  }


  /*
  * carica nello store rispettivamente:
  * 1. likes mandati
  * 2. likes ricevuti
  * 3. dettagli di tutti gli utenti
  * 4. notifiche dell'utente loggato
  * 5. chats dell'utente loggato (TODO: verificare ricezione chats utente loggato)
  * */
  loadInStore(details: UserDetails[], givenLikes: string[], receivedLikes:string[], notifications: Notification[], chats: ChatUser1User2[] ){ //TODO: aggiungere parametro dei messaggi
    this.store.dispatch(likesAPI.loaduserlikes({likes:givenLikes}));
    this.store.dispatch(likesAPI.loadreceivedlikes({likes: receivedLikes}));
    this.store.dispatch(userDetailsAPIActions.retrievealluserdetails({details: details}));
    this.store.dispatch(notificationsActions.getnotificationsbe({notifications: notifications}));
    this.store.dispatch(chatMessageActions.loadfrombe({chatMessagesOfUser: chats}));
  }
}
