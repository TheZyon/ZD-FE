import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputStringComponent } from './base-input/input-string/input-string.component';
import { SelectComponent } from './base-input/select/select.component';
import { PasswordComponent } from './base-input/password/password.component';
import { EmailComponent } from './base-input/email/email.component';


@NgModule({
  declarations: [
    InputStringComponent,
    SelectComponent,
    PasswordComponent,
    EmailComponent
  ],
  exports: [
    SelectComponent,
    InputStringComponent,
    SelectComponent,
    EmailComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MyformModule { }
