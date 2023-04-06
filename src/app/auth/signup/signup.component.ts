import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {TempUserInfoService} from "../../services/temp-user-info.service";
import {UserDetails} from "../../models/models";
import {concatMap, Subject, Subscription} from "rxjs";
import {UserDetailsService} from "../../services/user-details.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {



    signupForm!:FormGroup;
    userInfo: UserDetails;
    userInfoSub: Subscription;

  constructor(private as:AuthService, private r : Router, private userInfoSrv: TempUserInfoService, private detailsSrv: UserDetailsService) { }


    /*
    *
    *
    *
    *  private String name;
    private String username;
    private String email;
    private String password;
    private Set<String> roles;*/
  ngOnInit(): void {
  //TODO: testare ricezione di user info in Signup component
      this.userInfoSrv.userInfo$.subscribe(res=>{
      this.userInfo=res;
      console.log("in signup ricevute info: ", this.userInfo);
      })

      this.signupForm=new FormGroup({
          name: new FormControl(null, Validators.required),
          email: new FormControl(null, Validators.required),
          password: new FormControl(null, Validators.required)
      })
  }

  signup(){

      let value={
          name: this.signupForm.controls['name'].value,
          username: this.userInfo.username,
          email: this.signupForm.controls['email'].value,
          password: this.signupForm.controls['password'].value,
          roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']
      }
      console.log(value);

      this.as.signup(value).subscribe(()=>{
          this.r.navigate(["login"])
      })
  }
  ngOnDestroy(): void {

  this.userInfoSub.unsubscribe();

  }


}
