import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {urlAllUserDetails, urlUserDetails, urlUserDetailsByUsername} from "../../environments/environment";
import {Page, UserDetails} from "../models/models";
import {BehaviorSubject, map, Observable, Subject, take} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {


  private currentPages$= new BehaviorSubject<Page<UserDetails>|null>(null);
  pageIndex:number=0;
  pageSize:number=0;
  userIndex:number=0;
  pagesObs=this.currentPages$.asObservable();

  isLoggedUserPage=new BehaviorSubject<boolean>(true);
  currentUser$=this.currentPages$.pipe(map(page=>page.content[this.userIndex]))


  constructor(private httpSrv: HttpService, private authSrv: AuthService) {this.nextUser();}



  notInLoggedUserPage(){
  this.isLoggedUserPage.next(false);
  }
  inLoggedUserPage(){
    this.isLoggedUserPage.next(true);
  }
  nextUser(){ //TODO: verificare quando abbiamo abbastanza users registrati
    if(this.userIndex==this.pageSize-1 || this.pageIndex==0 && this.userIndex==0) this.nextPage();
    else this.userIndex+=1;
    this.currentUser$.subscribe(res=>{
    console.log("currentUser$: ", res);
    })
  }
  nextPage(){
    this.loadCurrentPage();
    this.pageIndex+=1;
    this.userIndex=0;
  }

  postUserDetails(ud: UserDetails){
   let url= urlUserDetails;
   return this.httpSrv.post<UserDetails>(url, ud);
  }

  loadCurrentPage(){ //carica nel pageObs la pagina attuale di info di userDetails
    let url = urlAllUserDetails + `/${this.pageIndex}`;

    this.httpSrv.get<Page<UserDetails>>(url).subscribe(res=>{
    this.currentPages$.next(res);
    this.pageSize=res.size;
    console.log("getAllPage response is: ",res);
    });

  }

  getByUsername(username:string):Observable<UserDetails>{
    let url = urlUserDetailsByUsername + `/${username}`;
    console.log(username + ":  carico per questo username")
    return this.httpSrv.get<UserDetails>(url);
  }


}
