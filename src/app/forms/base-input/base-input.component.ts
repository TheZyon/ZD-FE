import {Component, Input} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor} from "@angular/forms";

@Component({
 template:''
})
export class BaseInputComponent <T=string, C=string> implements ControlValueAccessor{


  // C -- tipo interno  -->  quello che inserisce l'utente
  // T --  tipo esterno --> quello che viene manipolato nel form control

  //presi in input dal padre explicitamente ---> label, formControlName
  @Input() label: string=null;
  @Input() formControlName:string;

  protected _value: C;
  disabled: boolean=false;

   _onChange: (value:any)=>{}
   _onTouched:()=>{}

  protected _control:AbstractControl; //era private


  @Input()
  get value():C{return this._value;}
  set value(value:C){
    // console.log("valore ricevuto prima di conversione: ", value);
    this._value=value;
    if(value==null){
      this._onChange(null);
    }
    else{
      let v=this.toExternalFormat(value);
      this._onChange(v);
      // console.log("valore formattato: ", v);
    }
    this._onTouched();
  }
    constructor(protected controlContainer: ControlContainer) { // per controllo errori (?)
    }
    ngOnInit(){
      this._control=this.controlContainer.control.get(this.formControlName);
    }

    get valid(){
    return !this._control||this._control.untouched||this._control.valid
    }
   get errorMessage():string{
      //interessante: get usato per ottenere nella view direttamente
      //il ritorno
      if(!this.valid){
      for(let prop in this._control.errors){
        switch (prop){
          case 'required': return `The field ${this.label} is required`;
          case 'minlength': return `Min length is ${this._control.errors[prop].requiredLength}`; //controllare
          default: console.log(prop); return 'Error not managed';
        }
      }
      }
      return null;
    }


  protected toInternalFormat(value:T):C{
    return (value as unknown)as C;
  }
  protected toExternalFormat(value:C):T{
    return (value as unknown)as T;
  }
  registerOnChange(fn: any): void {
  this._onChange=fn;
    // console.log("registerOnChange registra la callback: ", this._onChange);
  }
  registerOnTouched(fn: any): void {
    this._onTouched=fn;
    // console.log("registerOnTouched registra la callback: ", this._onTouched);
  }
  setDisabledState(isDisabled: boolean): void {
    //usato dal ts della componente quando lo stato del controllo diventa/smette di essere
    //'DISABLED'
    this.disabled=isDisabled;
    console.log("setDisabledState called");
  }

  writeValue(value: any): void { //invocato nel ts della componente per cambiare il valore dell'input della view
  if(value==null){
    this._value=null;
  }
  else{
    this._value=this.toInternalFormat(value)
    // console.log( "writeValue called with value: ", value);
  }
  }

}
