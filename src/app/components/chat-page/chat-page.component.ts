import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {chatMessageActions} from "../../ngRxState/chat-message.actions";
import {chatMessagesFeatureSelector} from "../../ngRxState/chat-message.selectors";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy{



  constructor(private store: Store) {
  }

  ngOnInit(): void {
  this.store.select(chatMessagesFeatureSelector)

  }



  ngOnDestroy(): void {
  }


}
