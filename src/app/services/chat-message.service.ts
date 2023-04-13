import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {getUsername, urlAllMessagesUser, urlChatMessages} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {ChatMessage, ChatUser1User2} from "../models/likes&chat";
import {catchError } from "rxjs/operators";
import {zip} from "rxjs";
import {errors} from "../../environments/errors";
import {NotificationsService} from "./notifications.service";

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor(private http: HttpService,private notificationSrv: NotificationsService, private store: Store) { }


  //POST
  postChatMessage( username2: string, message: string){

    let username1= getUsername(); //username logged user

    let m : ChatMessage = {
      username1: username1,
      username2: username2,
      message: message,
      time: (new Date()).toISOString()
    }

    return zip(
      this.http.post(urlChatMessages, m),
      this.notificationSrv.postNotification(username2,`You've got a message from ${username1}!!`)
      )
  }



/*//manda request al BE per creare il like di U1 a U2
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
*/




  //GET
  getChatMessagesOfUsers12(username1: string, username2: string){
    return this.http.get(urlChatMessages+`/${username1}/${username2}`);
  }

  getAllMessagesOfUser(){
    let uname= JSON.parse(localStorage.getItem('user')).username;
    return this.http.get<ChatUser1User2[]>(urlAllMessagesUser+`/${uname}`).pipe(catchError(err => errors(err)));
  }


  /*
* ritorna observable con tutti i chat messages dell'utente di dato username:
* 1. sottoscrizione allo store per recuperare gli usernames dei crushes
* 2. definizione di array che conterrà gli observables delle chiamate al BE per i messaggi con ogni crush
* 3. popolamento dell'array
* 4. ritorno zip degli observables dell'array ---> zip con gli observables delle chiamate per i messaggi per ogni crush
* */
  /* getAllChatMessagesOfUser(username: string){

     return this.store.select(reciprocalLikesUsersDetails) //1
       .pipe(concatMap(res=>{

         let obsArray: Observable<ChatMessage[]>[]; //2.
         res.forEach(recLikeDet=>{
           let usernameRecLike= recLikeDet.username;
           obsArray.push(this.getChatMessagesOfUsers12(username, usernameRecLike)) //3.
         })
         return zip(...obsArray); //4.
     }))
   }*/ //interessante ma si può semplificare...

}
