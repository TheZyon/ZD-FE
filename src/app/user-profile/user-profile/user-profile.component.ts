import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {urlUserDetails} from "../../../environments/environment";
import {UserDetailsService} from "../../services/user-details.service";
import {demoDetails, DogSex, UserDetails} from "../../models/models";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit{

  isOfLoggedUser=false;
  currentUserSubscription: Subscription;
  constructor(private detailsSrv: UserDetailsService, private authSrv: AuthService) {

  }

  @Input() username: string;
  detailsUser: UserDetails=demoDetails;

  @Output() likeEvent= new EventEmitter<string>();
  @Output() nextEvent= new EventEmitter<string>();


  /*
  * 1. controllo se username non è stato fornito dal padre, nel qual caso lo prendo dal localStorage
  * 2. ottengo dettagliUser in base all'username
  * */

  ngOnInit(){

    this.detailsSrv.isLoggedUserPage.subscribe(res=> {
      this.isOfLoggedUser = res;
      if (res) this.loadInfoLoggedUser();

      else {
        this.subscribeCurrentUser();
      }
    })
    }


  subscribeCurrentUser(){
    this.currentUserSubscription=this.detailsSrv.currentUser$.subscribe(res=>{
      console.log("res vista in currentUser$: ", res);
      this.detailsUser=res;
    })
  }
  loadInfoByUsername(username: string){ //carica info dato username
    this.currentUserSubscription=this.detailsSrv.getByUsername(username).subscribe(res=>{
      this.detailsUser=res;
  })
  }
  loadInfoLoggedUser(){ //carica le info dell'utente loggato
    // console.log("username è: ", JSON.parse(localStorage['user']).username);
    this.loadInfoByUsername(JSON.parse(localStorage['user']).username);
  }

  next(){
    this.detailsSrv.nextUser()
    this.subscribeCurrentUser()

  }
  like(){
    //aggiungere metodo per like
    this.detailsSrv.nextUser();
    this.subscribeCurrentUser();
  }


}
