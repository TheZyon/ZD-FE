import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'onlydate',
  pure: false
})
export class DatePipe implements PipeTransform {

  transform(value: any, isUtc: boolean=false) {
    if(value!=null) return DateUtils.toDate(value, isUtc);
    return null;
  }

}

@Pipe({name:'datetime', pure:false})
export class DateTimePipe implements PipeTransform{
  transform(value: any, isUtc:boolean){
    if(value!=null) return DateUtils.toDateTime(value);
    return null;
  }
}
export class DateUtils{
  static toDate(value: string, isUtc: boolean): string{
    if(value==null)return "";
    if(isUtc) return moment.utc(value).local().format("L");
    return moment(value, "YYYY-MM-DD").format("L");
  }
  static toDateTime(value:string): string{
    return moment.utc(value).local().format("L LTS");
  }
}
