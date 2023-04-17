import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, Subject, Subscription} from "rxjs";
import {UserDetails} from "../../models/models";
import {loggedUserDetails, usersDetailsFeatureSelector} from "../../ngRxState/userDetails.selectors";
import {reciprocalLikesSelector} from "../../ngRxState/likes.selectors";
import {Loading} from "../../utils/loadingSpinnerUtil";
import {Username$} from "../carousel-users/carousel-users.component";
import {getUsername} from "../../../environments/environment";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy{

  edit_mode: boolean=false;
  loading: Loading = new Loading();

  username$: Username$;

  details: UserDetails;
  loggedUserDetails$: Observable<UserDetails>=this.store.select(loggedUserDetails); //obs che streamma i userDetails dello user loggato
  private loggedUserDetailSub: Subscription;
  reciprocalLikesSub: Subscription;
  constructor(private store: Store) {
  }

  ngOnInit(): void {

    this.username$= new Username$();

    this.username$.next(getUsername())

    this.loggedUserDetailSub=this.loggedUserDetails$.subscribe(res=>{
    this.details=res;
    if(res) this.loading.loading.next(false)

    })

  }


  toggleEditMode(){
    this.edit_mode=!this.edit_mode;
  }

  ngOnDestroy(): void {
    if(this.loggedUserDetailSub) this.loggedUserDetailSub.unsubscribe();
    if(this.reciprocalLikesSub) this.reciprocalLikesSub.unsubscribe();
  }

}

