import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDetails} from "../../models/models";
import {AuthService} from "../../auth/auth.service";
import {UserDetailsService} from "../../services/user-details.service";
import {Router} from "@angular/router";
import {TempUserInfoService} from "../../services/temp-user-info.service";
import {concatMap, Subscription, zip} from "rxjs";
import { Store} from "@ngrx/store";
import {loggedUserDetails} from "../../ngRxState/userDetails.selectors";
import {userDetailsAPIActions} from "../../ngRxState/userDetailsAPIActions";

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styles: [
  ]
})
export class UserDetailsFormComponent implements OnInit, OnDestroy{


  isLoggedIn: boolean=false;

  isLoggedInAndLoggedDetailsSub: Subscription;

  defaultDetails: UserDetails={
   username:"",
   dogName:"",
   breed: "",
   dogAge: 0,
   dogSex: null,
   dogWeight: 0,
   description:"",
   idComune: 99
}
  loggedUserDetails:UserDetails=this.defaultDetails;

  constructor(private fb: FormBuilder,private store: Store, private authSrv: AuthService, private detailsSrv: UserDetailsService, private router: Router, private userInfoSrv: TempUserInfoService) {}

  ngOnInit(): void {

     this.isLoggedInAndLoggedDetailsSub=this.authSrv.isLoggedIn$.pipe(concatMap(islogged=>{
       this.isLoggedIn=islogged;
       return this.store.select(loggedUserDetails)
       }))
       .subscribe(res=>{
         console.log("is logged in? ", this.isLoggedIn, "details of logged user: ", res);
         if(this.isLoggedIn) {
           this.loggedUserDetails=res;

           this.detailsForm=this.fb.group({
             username: [this.loggedUserDetails.username, Validators.required],
             dogName: [ this.loggedUserDetails.dogName, [Validators.required, Validators.minLength(6)]],
             breed: [ this.loggedUserDetails.breed, [Validators.required, Validators.minLength(6)]],
             dogAge: [this.loggedUserDetails.dogAge, Validators.required],
             sexSelect: [ this.loggedUserDetails.dogSex , Validators.required],
             dogWeight: [ this.loggedUserDetails.dogWeight, Validators.required],
             description: [ this.loggedUserDetails.description, [Validators.required, Validators.minLength(20)]]
             //eventualmente aggiungere comune
           });}
       })

  }

  detailsForm: FormGroup=this.fb.group({
    username: [this.loggedUserDetails.username, Validators.required],
    dogName: [ this.loggedUserDetails.dogName, [Validators.required, Validators.minLength(6)]],
    breed: [ this.loggedUserDetails.breed, [Validators.required, Validators.minLength(6)]],
    dogAge: [this.loggedUserDetails.dogAge, Validators.required],
    sexSelect: [ this.loggedUserDetails.dogSex , Validators.required],
    dogWeight: [ this.loggedUserDetails.dogWeight, Validators.required],
    description: [ this.loggedUserDetails.description, [Validators.required, Validators.minLength(20)]]
    //eventualmente aggiungere comune
  });



  //items for dogSex select
  selectItems=[
    {
      key:"M",
      label:"Male"
    },
    {
      key:"F",
      label:"Female"
    }
  ]


  /*
  * 1. prendo dettagli dal form
  * distinguo se user loggato o meno:
  * 2. se user loggato faccio chiamata a BE per fare update dei dettagli dello user, aggiorno lo store e reindirizzo a /user
  * 3. se non è loggato si sta registrando, quindi: conservo i dettagli postati nel service UserInfoService, e reindirizzo al form di signup
  * */
  update() {

    let newUserDetails: UserDetails={//1.
      username: this.detailsForm.controls['username'].value,
      dogName:this.detailsForm.controls['dogName'].value,
      breed:this.detailsForm.controls['breed'].value,
      dogAge:this.detailsForm.controls['dogAge'].value,
      dogSex: this.detailsForm.controls['sexSelect'].value,
      dogWeight: this.detailsForm.controls['dogWeight'].value,
      description: this.detailsForm.controls['description'].value,
      idComune: 999
    }

    console.log("details received from form in form-component: ", newUserDetails);


    if(this.isLoggedIn){//2.
    zip(this.detailsSrv.postUserDetails(newUserDetails)).subscribe( (res)=> {

      this.store.dispatch(userDetailsAPIActions.update({ userDetails: res[0] as UserDetails}))
      this.router.navigate(['/user'])
    }
    );
    }
    else{ //3.
      this.userInfoSrv.setUserDetails(newUserDetails);

      this.router.navigate(['/signup'])
    }



  }

  ngOnDestroy(): void {
    if(this.isLoggedInAndLoggedDetailsSub) this.isLoggedInAndLoggedDetailsSub.unsubscribe();
  }
}



