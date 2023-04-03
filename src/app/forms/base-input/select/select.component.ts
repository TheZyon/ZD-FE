import {Component, forwardRef, Host, Input, SkipSelf} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseInputComponent} from "../base-input.component";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers:[{

    provide:NG_VALUE_ACCESSOR,

    useExisting:forwardRef(()=> SelectComponent),

    multi:true

  }]
})
export class SelectComponent extends BaseInputComponent{


  constructor(@Host() @SkipSelf() controlContainer: ControlContainer) {
    super(controlContainer);

  }

  @Input() items: any[]=[];
  @Input() itemKey: string = "key";
  @Input() itemLabel: string = "label";

  protected  override toExternalFormat(value: string): string {
    return value;
  }
  protected override toInternalFormat(value: string): string {
    return value;
  }

}
