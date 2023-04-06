import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Like} from "../models/likes&chat";
import {urlGetLikesByLiker, urlPostLike} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {concat, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private httpSrv: HttpService) {}


  //manda request al BE per creare il like di U1 a U2
  createLike(unameU1: string,unameU2:string){

    let like:Like={
      nameU1:unameU1,
      nameU2:unameU2,
      time: (new Date()).toISOString()
    }
    return this.httpSrv.post(urlPostLike, like);
  }

}
