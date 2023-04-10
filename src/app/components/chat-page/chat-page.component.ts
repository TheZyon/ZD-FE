import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {chatMessageActions} from "../../ngRxState/chat-message.actions";
import {chatMessagesFeatureSelector} from "../../ngRxState/chat-message.selectors";
import {loggedUserDetails, reciprocalLikesUsersDetails} from "../../ngRxState/userDetails.selectors";
import {demoDetails, UserDetails} from "../../models/models";
import {Subscription} from "rxjs";
import {ChatMessageService} from "../../services/chat-message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy{


  crushDet: UserDetails=demoDetails;
  usernameLoggedUser: string='';
  constructor(private store: Store, private chatSrv: ChatMessageService, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  messageInput: FormGroup= this.fb.group({

    message: ['', Validators.required]

  })

  ngOnInit(): void {
  this.crushDet=JSON.parse(this.route.snapshot.paramMap.get('infoCrush'));
  this.usernameLoggedUser=JSON.parse(localStorage.getItem('user')).username;
  }

  sendMessage(){
    let message= this.messageInput.controls['message'].value;
    let username2= this.crushDet.username;
    this.chatSrv.postChatMessage(this.usernameLoggedUser, username2, message).subscribe(res=>{
    console.log("the response of the BE is: ", res);
    })
  }

  ngOnDestroy(): void {

  }

}
