import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {urlAllUserDetails, urlUserDetails, urlUserDetailsByUsername} from "../../environments/environment";
import {Page, UserDetails} from "../models/models";
import {BehaviorSubject, map, Observable, of, Subject, take} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {LikesService} from "./likes.service";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {


  private currentPages$ = new BehaviorSubject<Page<UserDetails> | null>(null);
  pageIndex: number = 0;
  pageSize: number = 0;
  userIndex: number = 0;
  pagesObs = this.currentPages$.asObservable();

  isLoggedUserPage = new BehaviorSubject<boolean>(false);
  currentUser$ = this.pagesObs.pipe(map(page => page.content[this.userIndex]))


  constructor(private httpSrv: HttpService, private authSrv: AuthService, private likeSrv: LikesService) {
  }


  notInLoggedUserPage() {
    this.isLoggedUserPage.next(false);
  }

  inLoggedUserPage() {
    this.isLoggedUserPage.next(true);
  }

  postUserDetails(ud?: UserDetails): Observable<UserDetails>|Observable<number> {
    if(ud){
      let url = urlUserDetails;
      return this.httpSrv.post<UserDetails>(url, ud);
    }
    else {
      console.log("postUserDetails non ha ricevuto parametri e non ha postato nulla!")
      return of(1);}//placeholder observable per usare zip in login.component.ts
  }
}
