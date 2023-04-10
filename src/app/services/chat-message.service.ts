import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {urlChatMessages} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {reciprocalLikesUsersDetails} from "../ngRxState/userDetails.selectors";
import {concatMap, Observable} from "rxjs";
import {ChatMessage} from "../models/likes&chat";
import {zip} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor(private http: HttpService, private store: Store) { }


  //POST
  postChatMessage(username1: string, username2: string, message: string){

    let m : ChatMessage = {
      username1: username1,
      username2: username2,
      message: message,
      time: (new Date()).toISOString()
    }

    return this.http.post(urlChatMessages, m);
  }



  //GET
  getChatMessagesOfUsers12(username1: string, username2: string){
    return this.http.get(urlChatMessages+`/${username1}/${username2}`);
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

  getAllMessagesOfUser(){
    //TODO: implementare
  }



}
