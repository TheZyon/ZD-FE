import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDetails} from "../../models/models";
import {AuthService} from "../../auth/auth.service";
import {UserDetailsService} from "../../services/user-details.service";
import {urlUserDetails} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styles: [
  ]
})
export class UserDetailsFormComponent {


  constructor(private fb: FormBuilder, private authSrv: AuthService, private detailsSrv: UserDetailsService, private router: Router) {}

  detailsForm: FormGroup = this.fb.group({
    dogName: ["", [Validators.required, Validators.minLength(6)]],
    breed: ["", [Validators.required, Validators.minLength(6)]],
    dogAge: ["", Validators.required],
    sexSelect: [null, Validators.required],
    dogWeight: [0, Validators.required]
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
  ngOnInit() {}

  update() {

    console.log("updated: ", this.detailsForm.controls['dogName'].value);
    let userDetails: UserDetails={
      username: JSON.parse(localStorage.getItem('user')).username,
      dogName:this.detailsForm.controls['dogName'].value,
      breed:this.detailsForm.controls['breed'].value,
      dogAge:this.detailsForm.controls['dogAge'].value,
      dogSex: this.detailsForm.controls['sexSelect'].value,
      dogWeight: 99,
      idComune: 999
    }

    this.detailsSrv.postUserDetails(userDetails).subscribe(res=>{
    console.log("response: ",res);
    this.router.navigate(['/userDetails']);
    });


    /*
     *     private String username;
   private String dogName;
   private String breed;
   private int dogAge;
   @Enumerated(EnumType.STRING)
   private Sex dogSex;
   private int dogWeight;
   private long idComune;*/

    //TODO: completare creazione userDetails


  }
}



