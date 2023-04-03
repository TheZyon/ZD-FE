import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {RouterModule, Routes} from "@angular/router";
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MyformModule} from "../forms/myform.module";


const routes: Routes=[
  {
    path:'',
    component: UserProfileComponent
  },
  {
    path:'modificaProfilo',
    component: UserDetailsFormComponent
  }
]
@NgModule({
  declarations: [
    UserProfileComponent,
    UserDetailsFormComponent
  ],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MyformModule
  ]
})
export class UserProfileModule { }
