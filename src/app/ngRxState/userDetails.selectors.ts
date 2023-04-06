import{createSelector, createFeatureSelector} from "@ngrx/store";
import {UserDetails} from "../models/models";
import {userLikesFeatureSelector} from "./likes.selectors";
export const usersDetailsFeatureSelector= createFeatureSelector<UserDetails[]>('usersDetails'); //dettagli di tutti gli utenti


export const loggedUserDetails= createSelector( //dettagli dell'utente loggato
  usersDetailsFeatureSelector,

  (details )=>{
    let username= JSON.parse(localStorage.getItem('user')).username;
    let detail=details.filter(d =>d.username == username)[0];
    return detail;
  }
  )


export const notAlreadyLikedUsersDetails= createSelector( //dettagli degli utenti non ancora likeati
  userLikesFeatureSelector,
  usersDetailsFeatureSelector,
  (usernamesLikedUsers,allUsersDetails )=>{
    return allUsersDetails.filter(detail=>{
      let username= JSON.parse(localStorage.getItem('user')).username;
      return !usernamesLikedUsers.includes(detail.username)&&detail.username!=username;});
  })

export const likedUsersDetails= createSelector( //dettagli degli urtenti likeati
  userLikesFeatureSelector,
  usersDetailsFeatureSelector,
  (usernameLikedUsers, allUsersDetails)=>{
    return allUsersDetails.filter(det=>usernameLikedUsers.includes(det.username));
  })


