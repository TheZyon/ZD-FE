import {Component, Input} from '@angular/core';
import {ChatMessage, ChatUser1User2} from "../../models/likes&chat";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {

  @Input() message: ChatMessage;

  @Input() isOfUser: boolean=false;

  messageTemplateClass(){
    if(this.isOfUser) return 'user';
    return 'crush';
  }


}
