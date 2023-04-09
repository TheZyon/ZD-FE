import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {reciprocalLikesUsersDetails} from "../../ngRxState/userDetails.selectors";
import {UserDetails} from "../../models/models";

@Component({
  selector: 'app-crushes',
  templateUrl: './crushes.component.html',
  styleUrls: ['./crushes.component.scss']
})
export class CrushesComponent implements OnInit, OnDestroy{


  reciprocalLikesUsersDetailsSub: Subscription;

  crushesDetailsArray: UserDetails[]=[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.reciprocalLikesUsersDetailsSub=this.store.select(reciprocalLikesUsersDetails).subscribe(res=>{
    console.log("reciprocal likes details: ", res);
    this.crushesDetailsArray=res;
    })


  }

  ngOnDestroy(): void {
  if(this.reciprocalLikesUsersDetailsSub)this.reciprocalLikesUsersDetailsSub.unsubscribe();
  }

}
