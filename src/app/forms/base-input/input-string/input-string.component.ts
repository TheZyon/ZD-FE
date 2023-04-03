import {Component, forwardRef, Host, SkipSelf} from '@angular/core';
import {BaseInputComponent} from "../base-input.component";
import {ControlContainer, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-string',
  templateUrl: './input-string.component.html',
  providers:[{

    provide:NG_VALUE_ACCESSOR,

    useExisting:forwardRef(()=> InputStringComponent),

    multi:true

  }]
})
export class InputStringComponent extends BaseInputComponent{

  constructor(@Host() @SkipSelf() controlContainer: ControlContainer) {
    super(controlContainer);
  }

  protected  override toExternalFormat(value: string): string {
    return value;
  }
  protected override toInternalFormat(value: string): string {
    return value;
  }

}
