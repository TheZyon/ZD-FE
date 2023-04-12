import{createSelector, createFeatureSelector} from "@ngrx/store";
import {ChatMessage, ChatUser1User2} from "../models/likes&chat";

export const chatMessagesFeatureSelector= createFeatureSelector<ChatUser1User2[]>('chatMessage');

export const chatWithSpecificUser= (username: string) => createSelector( //esempio costruzione di selettore parametrico
  chatMessagesFeatureSelector,
    (chats:ChatUser1User2[])=>{
    return chats.filter(chat=>chat.username2==username)[0];
  })
