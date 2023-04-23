import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {demoDetails, UserDetails} from "../../models/models";
import {ChatMessageService} from "../../services/chat-message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {getUsername} from "../../../environments/environment";
import {chatWithSpecificUser} from "../../ngRxState/chat-message.selectors";
import {ChatMessage, ChatUser1User2} from "../../models/likes&chat";
import * as moment from "moment";


/*
* pagina per la chat tra due users: contiene i chatMessage e un form per postare un nuovo messaggio
* */
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy{


  messages: ChatMessage[]=[];

  crushDet: UserDetails=demoDetails;
  usernameLoggedUser=getUsername();


  constructor(private store: Store, private chatSrv: ChatMessageService, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  messageInput: FormGroup= this.fb.group({
    message: ['', Validators.required]
  })

  ngOnInit(): void {
  this.crushDet=JSON.parse(this.route.snapshot.paramMap.get('infoCrush'));
  this.store.select(chatWithSpecificUser(this.crushDet.username)).subscribe(res=>{
  // console.log("la chat con il crush dovrebbe essere: ", res);
     this.messages=res.messages.slice().sort((m1,m2)=> {

       return moment(m1.time).diff(m2.time).valueOf();
     }
     );
  })
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
