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
        console.log("il like con: ", likeSent, " è reciproco!! Può darsi che ti accoppi!");
        reciprocalLikesArray.push(likeSent);
      }
      })
    return reciprocalLikesArray;
    });
