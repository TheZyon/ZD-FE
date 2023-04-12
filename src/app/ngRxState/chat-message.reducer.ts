import { createReducer, on } from '@ngrx/store';
import * as ChatMessageActions from './chat-message.actions';
import {ChatMessage, ChatUser1User2} from "../models/likes&chat";
import {chatMessageActions} from "./chat-message.actions";

export const chatMessageFeatureKey = 'chatMessage';


export const initialState: ChatUser1User2[]=[];

export const chatMessagesReducer = createReducer(
  initialState,
  on(chatMessageActions.loadfrombe, (state, {chatMessagesOfUser})=>chatMessagesOfUser),
  on(chatMessageActions.postchatmessage, (state, {chatMessage})=> {

    let uNameReceiver = chatMessage.username2;

    let state1: ChatUser1User2[] = {...state}; //copy of the state

    state1.map(chat12 =>{
      if(chat12.username2==uNameReceiver) chat12.messages.push(chatMessage);
        return chat12;
    })
    return state1;
  })

);

