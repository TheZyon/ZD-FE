import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCard } from './user-profile/profile-card.component';
import {RouterModule, Routes} from "@angular/router";
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MyformModule} from "../forms/myform.module";


const routes: Routes=[
  {
    path:'',
    component: ProfileCard
  },
  {
    path:'modificaProfilo',
    component: UserDetailsFormComponent
  }
]
@NgModule({
  declarations: [
    ProfileCard,
    UserDetailsFormComponent
  ],
  exports: [
    ProfileCard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MyformModule
  ]
})
export class UserProfileModule { }
