import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, Subject, Subscription} from "rxjs";
import {UserDetails} from "../../models/models";
import {loggedUserDetails, usersDetailsFeatureSelector} from "../../ngRxState/userDetails.selectors";
import {reciprocalLikesSelector} from "../../ngRxState/likes.selectors";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy{

  details: UserDetails;
  loggedUserDetails$: Observable<UserDetails>=this.store.select(loggedUserDetails); //obs che streamma i userDetails dello user loggato
  private loggedUserDetailSub: Subscription;
  tempReciprocalLikes$: Observable<string[]>= this.store.select(reciprocalLikesSelector); //obs che teniamo qui temporaneamente --> mostra i likes reciproci
  reciprocalLikesSub: Subscription;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.loggedUserDetailSub=this.loggedUserDetails$.subscribe(res=>{
    this.details=res;
    })
    this.reciprocalLikesSub= this.tempReciprocalLikes$.subscribe(res=>{
    console.log("reciprocal likes are....: ", res);
    })
  }

  ngOnDestroy(): void {
    if(this.loggedUserDetailSub) this.loggedUserDetailSub.unsubscribe();
    if(this.reciprocalLikesSub) this.reciprocalLikesSub.unsubscribe();
  }

}
