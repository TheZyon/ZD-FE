import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {demoDetails, UserDetails} from "../../models/models";
import {ChatMessageService} from "../../services/chat-message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {getUsername} from "../../../environments/environment";


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy{


  crushDet: UserDetails=demoDetails;
  usernameLoggedUser=getUsername();
  constructor(private store: Store, private chatSrv: ChatMessageService, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  messageInput: FormGroup= this.fb.group({
    message: ['', Validators.required]
  })

  ngOnInit(): void {
  this.crushDet=JSON.parse(this.route.snapshot.paramMap.get('infoCrush'));

  this.chatSrv.getAllMessagesOfUser().subscribe(
    res=>{
  console.log("the response of the BE is: ", res);
  },
    error => console.log("errore: ", error))
  }

  sendMessage(){
    let message= this.messageInput.controls['message'].value;
    let username= this.crushDet.username;

    this.chatSrv.postChatMessage(username, message).subscribe(res=>{
    console.log("the response of the BE is: ", res);
    })
  }

  ngOnDestroy(): void {

  }

}
