import {Component, Inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {HttpService} from "./services/http.service";
import {urlAllUserDetails, USERNAME_TOKEN} from "../environments/environment";
import {uDetailSAPIActions} from "./ngRxState/userDetails.actions";
import {loggedUserDetails, usersDetailsFeatureSelector} from "./ngRxState/userDetails.selectors";

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
    this.store.dispatch(uDetailSAPIActions.retrievealluserdetails({details: res.content}));
    // console.log(res);
    })
  }

  //mostra i userDetails contenuti in Store
  watchUserDetails(){
    this.store.select(usersDetailsFeatureSelector).subscribe(res=>{
    console.log("details in the store: ",res);
    })
     }
}
