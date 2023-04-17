import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {ProfilePic} from "../models/profilePic";
import {urlProfilePics} from "../../environments/environment";
import{getUsername} from "../../environments/environment";
import {Observable} from "rxjs";


declare var cloudinary: any;

@Injectable({
  providedIn: 'root'
})
export class ProfilePicsService {

  constructor(private http: HttpService) { }

  //POST
  postImg(dto: ProfilePic){
    return this.http.post(urlProfilePics, dto);
  }

  //GET
  getByUsername(username:string): Observable<ProfilePic[]>{
    return this.http.get(urlProfilePics+`/${username}`);
  }



   myWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dk4tnmdfd',
      uploadPreset: 'c3eexxwf',
      // cropping: true, //add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      // multiple: false,  //restrict upload to a single file
      folder: "UtenteDemo_images", //upload files to the specified folder
      tags: ["users", "profilePic"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme

    },
    (error: any, result: { event: string; info: any; }) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        this.postImg({public_id: result.info.public_id, username: getUsername()}).subscribe(res=>{
          console.log("response of the BE is: ", res);
        })
      }
    }
  )

}
