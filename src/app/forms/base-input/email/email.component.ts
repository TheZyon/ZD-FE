import {Component, forwardRef, Host, SkipSelf} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseInputComponent} from "../base-input.component";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  providers:[{

    provide:NG_VALUE_ACCESSOR,

    useExisting:forwardRef(()=> EmailComponent),

    multi:true

  }]
})
export class EmailComponent extends BaseInputComponent{
  constructor(@Host() @SkipSelf() controlContainer: ControlContainer) {
    super(controlContainer);
  }
}
