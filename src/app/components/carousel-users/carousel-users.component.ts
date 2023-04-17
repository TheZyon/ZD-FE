import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UserDetailsService} from "../../services/user-details.service";
import {demoDetails, UserDetails} from "../../models/models";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {
  likedUsersDetails,
  loggedUserDetails,
  notAlreadyLikedUsersDetails,
  usersDetailsFeatureSelector
} from "../../ngRxState/userDetails.selectors";
import {Store} from "@ngrx/store";
import {userLikesFeatureSelector} from "../../ngRxState/likes.selectors";
import {arrRemove} from "rxjs/internal/util/arrRemove";
import {likeActions} from "../../ngRxState/likes.actions";
import {LikesService} from "../../services/likes.service";
import {USERNAME_TOKEN} from "../../../environments/environment";

@Component({
  selector: 'app-carousel-users',
  templateUrl: './carousel-users.component.html',
  styleUrls: ['./carousel-users.component.scss']
})
export class CarouselUsersComponent implements OnInit, OnDestroy{

  details: UserDetails[];
  tempLikes:string[]=[]; //TODO: temp, for likes debugging
  details$: Observable<UserDetails[]>=this.store.select(notAlreadyLikedUsersDetails); //obs che streamma gli users non ancora likeati
  likes$: Observable<string[]>=this.store.select(userLikesFeatureSelector);
  tempLikesSub: Subscription; //TODO: temp, for likes debugging
  private detailsSub: Subscription; //sub to see users to possibly like
  indexCurrentUser:number=-1; //indice in details dell'utente attualmente visualizzato nel carousel

  thereAreNoMoreUsers=false;


  currentUserUsername$=new BehaviorSubject<string|null>(null);

  username$:Username$=new Username$();



  constructor(private store: Store, private likesSrv: LikesService) {
  }

  /*
  * 1. subscribe to obs streaming notAlreadyLikedUsersDetails
  * 2. subscribe to obs streaming received likes ---> this is temporary for debugging
  * */
  ngOnInit(): void {




    this.detailsSub=this.details$.subscribe(res=>{
      this.details=res;
      console.log(" utenti non ancora likeati: ", res);


      if(this.details.length==0) this.thereAreNoMoreUsers=true;
      if(this.indexCurrentUser==-1) { //prima di mostrare il primo user
        this.username$.next(this.details[0].username);
        this.indexCurrentUser++;
      }

    })
    this.tempLikesSub=this.likes$.subscribe(res=>{
    console.log("likes of this user are: ", res);
    this.tempLikes=res;
    })
  }

  /*unsubscribe from everything*/
  ngOnDestroy(){
    if(this.detailsSub) this.detailsSub.unsubscribe();
    if(this.tempLikesSub) this.tempLikesSub.unsubscribe();
  }

  /*
  * if indexCurrentUser is the last index in details, activates the "thereAreNoMoreUsers" condition,
  * otherwise increments indexCurrentUser by 1
  * */
  next(username:any){
    console.log("info details.length: ", this.details.length, "info current index: ", this.indexCurrentUser, "username current user: ", username);
    this.indexCurrentUser +1 == this.details.length ? this.thereAreNoMoreUsers=true : this.indexCurrentUser++;
    this.username$.next(this.details[this.indexCurrentUser].username);
    }

    /*
    *1.creates a like (botyh in the BE and in the Store) with the user with username
    *2.posts notification to the BE
    * */
  like(username:any){

    let unameLoggedUser= JSON.parse(localStorage.getItem('user')).username;

    this.likesSrv.postLike(unameLoggedUser, username).subscribe(res=>{ //create like & notification in the BE
    console.log("the response of the BE at the like is: ", res);
    });

    this.store.dispatch(likeActions.like({usernameLiked: username})) //create like in the Store
    if(this.details.length==this.indexCurrentUser) this.thereAreNoMoreUsers=true;
  }

}

export class Username${

  private username$: BehaviorSubject<string|null>

  constructor() {
  this.username$=new BehaviorSubject<string | null>(null);
  }

   next(username: string){
    this.username$.next(username);
    console.log("now username streamed by Username$ is ", username)
  }

   get username(){
    return this.username$;
  }

}

