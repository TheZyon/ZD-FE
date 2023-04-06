import { createActionGroup, props } from '@ngrx/store';
import {UserDetails} from "../models/models";

export const userDetailsActions = createActionGroup({
  source: 'app.component.ts or user-details-form.ts',
  events: {
    'retrievealluserdetails': props<{ details:UserDetails[]}>(), //il prop è il payload dell'azione
    'update': props<{ userDetails: UserDetails }>() //il prop è il payload dell'azione
  }
  });
