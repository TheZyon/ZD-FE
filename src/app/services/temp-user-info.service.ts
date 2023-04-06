import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {UserDetails} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class TempUserInfoService {

  userInfo$=new BehaviorSubject<UserDetails|null>(null);
  constructor() { }

  setUserDetails(ud: UserDetails){
    this.userInfo$.next(ud);
  }
  clean(){
    this.userInfo$.next(null);
  }

}
