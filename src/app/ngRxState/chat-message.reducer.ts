import { createReducer, on } from '@ngrx/store';
import * as ChatMessageActions from './chat-message.actions';
import {ChatMessage} from "../models/likes&chat";
import {chatMessageActions} from "./chat-message.actions";

export const chatMessageFeatureKey = 'chatMessage';


export const initialState: ChatMessage[]=[];

export const chatMessagesReducer = createReducer(
  initialState,
  on(chatMessageActions.loadfrombe, (state, {chatMessagesOfUser})=>chatMessagesOfUser),
  on(chatMessageActions.postchatmessage, (state, {chatMessage})=>[...state, chatMessage])

);

