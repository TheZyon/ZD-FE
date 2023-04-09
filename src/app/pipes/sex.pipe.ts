import {Pipe, PipeTransform} from '@angular/core';
import {DogSex} from "../models/models";

@Pipe({
  name: 'sex',
  pure: false
})
export class SexPipe implements PipeTransform {

  transform(value: DogSex): string {
    return value.valueOf().toString()=='M' ? 'gentledog' : 'ladydog';

  }

}
