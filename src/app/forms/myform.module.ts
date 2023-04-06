import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputStringComponent } from './base-input/input-string/input-string.component';
import { SelectComponent } from './base-input/select/select.component';
import { PasswordComponent } from './base-input/password/password.component';
import { EmailComponent } from './base-input/email/email.component';
import { TextAreaComponent } from './base-input/text-area/text-area.component';


@NgModule({
  declarations: [
    InputStringComponent,
    SelectComponent,
    PasswordComponent,
    EmailComponent,
    TextAreaComponent
  ],
    exports: [
        SelectComponent,
        InputStringComponent,
        SelectComponent,
        EmailComponent,
        PasswordComponent,
        TextAreaComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MyformModule { }
