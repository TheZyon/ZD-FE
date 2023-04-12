import { createActionGroup, props } from '@ngrx/store';
import {ChatMessage, ChatUser1User2} from "../models/likes&chat";
export const chatMessageActions = createActionGroup({
  source: 'login or time interval',
  events: {
    'loadFromBE': props<{ chatMessagesOfUser: ChatUser1User2[] }>(),
    'postChatMessage': props<{ chatMessage: ChatMessage }>()
  }
  });



