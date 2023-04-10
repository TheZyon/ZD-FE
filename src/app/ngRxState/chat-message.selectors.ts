import{createSelector, createFeatureSelector} from "@ngrx/store";
import {ChatMessage} from "../models/likes&chat";

export const chatMessagesFeatureSelector= createFeatureSelector<ChatMessage[]>('chatMessage');
