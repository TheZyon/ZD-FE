import { createActionGroup, props } from '@ngrx/store';
import {UserDetails} from "../models/models";

export const uDetailSAPIActions = createActionGroup({
  source: 'details api',
  events: {
    'retrievealluserdetails': props<{ details:UserDetails[]}>() //il prop è il payload dell'azione
  }
  });

export const uDetailsLikeActions=createActionGroup({
  source: 'carousel likes',
  events: {
    'like user': props<{detail: UserDetails}>(),
    'dislike user': props<{detail: UserDetails}>()
  }
})
