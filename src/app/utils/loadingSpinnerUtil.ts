import {BehaviorSubject} from "rxjs";

export class Loading{

  private loading$= new BehaviorSubject<boolean>(true);

  setFinished(){
    this.loading$.next(false);
  }
  get loading(){
    return this.loading$;
  }
}
