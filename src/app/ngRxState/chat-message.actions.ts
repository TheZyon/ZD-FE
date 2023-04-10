import { createActionGroup, props } from '@ngrx/store';
import {ChatMessage} from "../models/likes&chat";
export const chatMessageActions = createActionGroup({
  source: 'login or time interval',
  events: {
    'loadFromBE': props<{ chatMessagesOfUser: ChatMessage[] }>(),
    'postChatMessage': props<{ chatMessage: ChatMessage }>()
  }
  });



