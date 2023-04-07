import {createFeatureSelector, createSelector} from "@ngrx/store";
export const userLikesFeatureSelector= createFeatureSelector<string[]>('likes');

export const userReceivedLikesFeatureSelector= createFeatureSelector<string[]>('receivedLikes');

export const reciprocalLikesSelector= createSelector(
  userLikesFeatureSelector,
  userReceivedLikesFeatureSelector,
  (likesSent, likesReceived)=>{
    let reciprocalLikesArray:string[]=[];
    likesSent.forEach(likeSent=> {
      if(likesReceived.find(likeReceived=>likeReceived==likeSent)) {
        reciprocalLikesArray.push(likeSent);
      }
      })
    return reciprocalLikesArray;
    });
