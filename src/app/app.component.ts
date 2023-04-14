import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {HttpService} from "./services/http.service";
import { urlChatMessages} from "../environments/environment";
import {loggedUserDetails, usersDetailsFeatureSelector} from "./ngRxState/userDetails.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {


  constructor(private store: Store, private httpSrv: HttpService) {
  }


  errorMessage='';
  //mostra i userDetails contenuti in Store
  watchUserDetails(){
  this.store.select(usersDetailsFeatureSelector).subscribe(res=>{
  console.log("all users details: ", res);
  })
  this.store.select(loggedUserDetails).subscribe(res=>{
  console.log("user details selected: ",res);
  })
  }

  call(){
    this.httpSrv.get(urlChatMessages+"/test"). subscribe(res=>{
    console.log(res);
    },
      error => this.errorMessage=error)
  }

}
