import {Component, Inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {HttpService} from "./services/http.service";
import {urlAllUserDetails, USERNAME_TOKEN} from "../environments/environment";
import {userDetailsActions} from "./ngRxState/userDetails.actions";
import {loggedUserDetails, usersDetailsFeatureSelector} from "./ngRxState/userDetails.selectors";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {



  constructor(private store: Store, private httpSrv: HttpService) {
  this.loadUsersDetails();
  }

  //carica in Store l'array con i dettagli degli utenti del sito
  loadUsersDetails(){
    this.httpSrv.get(urlAllUserDetails+"/0").subscribe(res=>{ // gestire paginazione in caso
    this.store.dispatch(userDetailsActions.retrievealluserdetails({details: res.content}));
    // console.log(res);
    })
  }

  //mostra i userDetails contenuti in Store
  watchUserDetails(){
    zip(
      this.store.select(loggedUserDetails),
      this.store.select(usersDetailsFeatureSelector)
    )
    .subscribe(res=>{
    console.log("logged user details: ",res[0]);
    console.log("all retrieved users details in the store: ",res[1]);
    })
     }
}
