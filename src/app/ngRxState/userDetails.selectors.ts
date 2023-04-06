import{createSelector, createFeatureSelector} from "@ngrx/store";
import {UserDetails} from "../models/models";
import {userLikesFeatureSelector} from "./likes.selectors";
export const usersDetailsFeatureSelector= createFeatureSelector<UserDetails[]>('usersDetails'); //seleziona l'array con i dettagli di tutti gli utenti


export const loggedUserDetails= createSelector(
  usersDetailsFeatureSelector,

  (details )=>{
    let username= JSON.parse(localStorage.getItem('user')).username;
    let detail=details.filter(d =>d.username == username)[0];
    return detail;
  }
  )


export const notAlreadyLikedUsersDetails= createSelector(
  userLikesFeatureSelector,
  usersDetailsFeatureSelector,
  (usernamesLikedUsers,allUsersDetails )=>{
    return allUsersDetails.filter(detail=>{
      let username= JSON.parse(localStorage.getItem('user')).username;
      return !usernamesLikedUsers.includes(detail.username)&&detail.username!=username;});
  })


