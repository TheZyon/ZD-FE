import { createActionGroup, props } from '@ngrx/store';
export const likeActions = createActionGroup({
  source: 'carousel-users',
  events: {
    'like': props<{ usernameLiked: string }>(),
    'dislike': props<{ usernameDisliked: string[] }>()
  }
  });

export const likesAPI=createActionGroup({
  source:'likesApi',
  events:{
    'loadUserLikes': props<{ likes: string[] }>(),
    'loadReceivedLikes': props<{ likes: string[] }>()
  }
})


