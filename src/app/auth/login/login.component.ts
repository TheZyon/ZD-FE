import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthData, AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {likesAPI} from "../../ngRxState/likes.actions";
import {HttpService} from "../../services/http.service";
import {urlAllUserDetails, urlGetLikesByLiker, USERNAME_TOKEN} from "../../../environments/environment";
import {concatMap, of, Subscription, zip} from "rxjs";
import {UserDetailsService} from "../../services/user-details.service";
import {TempUserInfoService} from "../../services/temp-user-info.service";
import {UserDetails} from "../../models/models";
import {LikesService} from "../../services/likes.service";
import {userDetailsAPIActions} from "../../ngRxState/userDetailsAPIActions";
import {NotificationsService} from "../../services/notifications.service";
import {notificationsActions} from "../../ngRxState/notifications.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!:FormGroup;
    userInfo:UserDetails|null;
    loginF!:FormGroup;
    loginSub: Subscription;
    userInfoSub:Subscription;
  constructor(private as:AuthService,private notificSrv: NotificationsService, private likeSrv: LikesService, private router:Router, private store: Store, private http: HttpService, private detailsSrv: UserDetailsService, private userInfoSrv: TempUserInfoService ) { }

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
  * al login recupero dal BE i likes dello user
  * */
  login(){
      let value={
          username: this.loginForm.controls["username"].value,
          password: this.loginForm.controls['password'].value
      }


   this.loginSub= this.as.login(value).pipe(
      concatMap(res=>zip(
          this.likeSrv.getLikesByLiker(res.username),
          this.likeSrv.getLikesByLiked(res.username),
          this.notificSrv.getNotificationsByUsername(res.username),
          this.detailsSrv.postUserDetails(this.userInfo))),
          concatMap(res=> zip(
              of(res),
              this.detailsSrv.getAllUsersDetails() // gestire paginazione in caso
            )))
      .subscribe((res)=>{
        this.loadLikesInStore(res[0][0], res[0][1]);
        console.log("given likes: ", res[0][0]);
        console.log("received likes: ", res[0][1]);
        console.log("received notifications: ", res[0][2]);
        console.log("all users details: ", res[1].content); //attenzione viene ricevuta dal BE una page quindi bisogna estrarre il content
        // console.log("response del BE al postUserDetails: ", res[0][3]);
        this.store.dispatch(userDetailsAPIActions.retrievealluserdetails({details: res[1].content}));
        this.store.dispatch(notificationsActions.getnotificationsbe({notifications: res[0][2]}));
        this.router.navigate(['/user']);
    })


    /*this.store.dispatch(userDetailsActions.retrievealluserdetails({details: res.content}));*/
  }

  loadLikesInStore(givenLikes: string[], receivedLikes:string[]){
    this.store.dispatch(likesAPI.loaduserlikes({likes:givenLikes}));
    this.store.dispatch(likesAPI.loadreceivedlikes({likes: receivedLikes}));
  }

  ngOnDestroy(){
    if(this.loginSub) this.loginSub.unsubscribe();
    if(this.userInfoSub)this.userInfoSub.unsubscribe();
  }

}
