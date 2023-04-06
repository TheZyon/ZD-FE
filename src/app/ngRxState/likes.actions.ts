import { createActionGroup, props } from '@ngrx/store';
export const likeActions = createActionGroup({
  source: 'carousel-users',
  events: {
    'like': props<{ usernameLiked: string }>(), //coppia, username dell'utente loggato e username dell'utente che ha ricevuto il like
    'dislike': props<{ usernameDisliked: string[] }>()
  }
  });

export const likesAPI=createActionGroup({
  source:'likesApi',
  events:{
    'loadUserLikes': props<{ likes: string[] }>()
  }
})


