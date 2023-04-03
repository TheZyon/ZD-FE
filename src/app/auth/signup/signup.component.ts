import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



    signupForm!:FormGroup;

  constructor(private as:AuthService, private r : Router) { }


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

      this.signupForm=new FormGroup({
          name: new FormControl(null, Validators.required),
          username: new FormControl(null, Validators.required),
          email: new FormControl(null, Validators.required),
          password: new FormControl(null, Validators.required)
      })
  }

  signup(){

      let value={
          name: this.signupForm.controls['name'].value,
          username: this.signupForm.controls['username'].value,
          email: this.signupForm.controls['email'].value,
          password: this.signupForm.controls['password'].value,
          roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']
      }
      console.log(value);

      this.as.signup(value).subscribe(()=>{
          this.r.navigate(["login"])
      })
  }

}
