import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserDetails} from "../../models/models";
import {DogSex} from "../../models/models";

@Component({
  selector: 'app-user-card',
  templateUrl: './profile-card.component.html',
  styles: [
  ]
})
export class ProfileCard{
  constructor() {}
  @Input() isOfLoggedUser: boolean=true;
  @Input() userDetails: UserDetails;
  @Output() nextEvent= new EventEmitter<string>();
  @Output() likeEvent= new EventEmitter<string>();

  tempNoDescriptionPlaceholder= "this user has not posted a description yet!!"
  next(){
    this.nextEvent.emit(this.userDetails.username);
  }
  printUsernames(){
    console.log(JSON.parse(localStorage.getItem('user')).username, this.userDetails.username);
  }
  like(){
      this.likeEvent.emit(this.userDetails.username);
    }

}
