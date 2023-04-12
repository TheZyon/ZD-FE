import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthData, AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {likesAPI} from "../../ngRxState/likes.actions";
import {HttpService} from "../../services/http.service";
import {concatMap, interval, mergeMap, of, Subscription, zip} from "rxjs";
import {UserDetailsService} from "../../services/user-details.service";
import {TempUserInfoService} from "../../services/temp-user-info.service";
import {UserDetails} from "../../models/models";
import {LikesService} from "../../services/likes.service";
import {userDetailsAPIActions} from "../../ngRxState/userDetailsAPIActions";
import {NotificationsService} from "../../services/notifications.service";
import {notificationsActions} from "../../ngRxState/notifications.actions";
import {Notification} from "../../models/notification";
import {ChatMessageService} from "../../services/chat-message.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string='';
  loginForm!:FormGroup;
  userInfo:UserDetails|null;
  loginF!:FormGroup;
  loginSub: Subscription;
  userInfoSub:Subscription;
  constructor(private as:AuthService,private chatSrv: ChatMessageService, private notificSrv: NotificationsService, private likeSrv: LikesService, private router:Router, private store: Store, private http: HttpService, private detailsSrv: UserDetailsService, private userInfoSrv: TempUserInfoService ) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
    this.userInfoSub=this.userInfoSrv.userInfo$.subscribe(res=>{ //sottorcrizione per prendere le info user--> res è non null solo dopo avvenuto signup
      this.userInfo=res;
      console.log("user info ricevute al livello del login: ", res);
    })
  }

  /*
  * 1. faccio login
  * 2. concatMap ---> eventualmente mando i dettagli inseriti da user (caso primo login in assoluto)
  * 3. concatMap ---> observable che ogni tot di tempo manda richiesta al be per ottenere tutte le info dell'utente (likes, notifiche, messaggi)
  *
  *
  * 2. le notifiche
  * */
  login(){
    let value={
      username: this.loginForm.controls["username"].value,
      password: this.loginForm.controls['password'].value
    }


    this.loginSub= this.as.login(value).pipe( //1.
      concatMap(res=>
        zip(
          of(res),
          this.detailsSrv.postUserDetails(this.userInfo) //2.
        )
      ),
      concatMap((res: any[])  => this.timeIntervalInfoRequestsBE(res[0] as AuthData)) //3.
    )
      .subscribe(
        res=>{
          this.loadInStore(res[0].content, res[1], res[2], res[3]);
          console.log("the res[4] is: ", res[4]);
        },
        error=>this.errorMessage=error.message)

  }


  timeIntervalInfoRequestsBE(res: AuthData){

    let AllDataObs= zip(
      this.detailsSrv.getAllUsersDetails(),
      this.likeSrv.getLikesByLiker(res.username),
      this.likeSrv.getLikesByLiked(res.username),//1.
      this.notificSrv.getNotificationsByUsername(res.username), //2.
      this.chatSrv.getAllMessagesOfUser())

    return interval(1000).pipe(
      mergeMap(i=>AllDataObs))

  }


  /*
  * carica nello store rispettivamente:
  * 1. likes mandati
  * 2. likes ricevuti
  * 3. dettagli di tutti gli utenti
  * 4. notifiche dell'utente loggato
  * */
  loadInStore(details: UserDetails[], givenLikes: string[], receivedLikes:string[], notifications: Notification[] ){ //TODO: aggiungere parametro dei messaggi
    this.store.dispatch(likesAPI.loaduserlikes({likes:givenLikes}));
    this.store.dispatch(likesAPI.loadreceivedlikes({likes: receivedLikes}));
    this.store.dispatch(userDetailsAPIActions.retrievealluserdetails({details: details}));
    this.store.dispatch(notificationsActions.getnotificationsbe({notifications: notifications}));

  }

  ngOnDestroy(){
    //if(this.loginSub) this.loginSub.unsubscribe();
    if(this.userInfoSub)this.userInfoSub.unsubscribe();
  }

}
