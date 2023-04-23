import {Component, forwardRef, Host, SkipSelf} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseInputComponent} from "../base-input.component";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  providers:[{

    provide:NG_VALUE_ACCESSOR,

    useExisting:forwardRef(()=> TextAreaComponent),

    multi:true

  }]
})
export class TextAreaComponent extends BaseInputComponent{
  constructor(@Host() @SkipSelf() controlContainer: ControlContainer) {
    super(controlContainer);
  }

  width = `${screen.width*0.9 }px`;
}
