import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {urlUserDetails} from "../../../environments/environment";
import {UserDetailsService} from "../../services/user-details.service";
import {demoDetails, DogSex, UserDetails} from "../../models/models";
import {AuthService} from "../../auth/auth.service";
import {concat, filter, forkJoin, mergeMap, Observable, Subscription, take} from "rxjs";
import {LikesService} from "../../services/likes.service";
import {tap} from "rxjs/operators";

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
