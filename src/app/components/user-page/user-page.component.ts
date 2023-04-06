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
  details$: Observable<UserDetails>=this.store.select(loggedUserDetails); //obs che streamma i userDetails dello user loggato
  private detailsSub: Subscription;
  tempReciprocalLikes$: Observable<string[]>= this.store.select(reciprocalLikesSelector); //obs che teniamo qui temporaneamente --> mostra i likes reciproci
  reciprocalLikesSub: Subscription;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.detailsSub=this.details$.subscribe(res=>{
    // console.log("user details seen in user-page: ", res);
    this.details=res;
    })
    this.reciprocalLikesSub= this.tempReciprocalLikes$.subscribe(res=>{
    console.log("reciprocal likes are....: ", res);
    })
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
    this.reciprocalLikesSub.unsubscribe();
  }

}
