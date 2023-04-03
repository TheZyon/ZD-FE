import {Component, forwardRef, Host, SkipSelf} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseInputComponent} from "../base-input.component";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  providers:[{

    provide:NG_VALUE_ACCESSOR,

    useExisting:forwardRef(()=> PasswordComponent),

    multi:true

  }]
})
export class PasswordComponent extends BaseInputComponent{
  constructor(@Host() @SkipSelf() controlContainer: ControlContainer) {
    super(controlContainer);
  }
}
