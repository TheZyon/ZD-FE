import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthData, AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {likesAPI} from "../../ngRxState/likes.actions";
import {HttpService} from "../../services/http.service";
import {urlGetLikesByLiker, USERNAME_TOKEN} from "../../../environments/environment";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!:FormGroup;

    loginF!:FormGroup;
  constructor(private as:AuthService, private router:Router, private store: Store, private http: HttpService) { }

  ngOnInit(): void {
  this.loginForm= new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
  })

  }

  /*
  * al login recupero dal BE i likes dello user
  * */
  login(){

      let value={
          username: this.loginForm.controls["username"].value,
          password: this.loginForm.controls['password'].value
      }


    this.as.login(value).pipe(concatMap(res=> this.http.get(urlGetLikesByLiker+`/${res.username}`)))
      .subscribe((res)=>{
        this.loadLikesInStore(res);
        this.router.navigate(['/userPage']);
    })

  }

  loadLikesInStore(likes: string[]){
    this.store.dispatch(likesAPI.loaduserlikes({likes:likes}));
  }


}
