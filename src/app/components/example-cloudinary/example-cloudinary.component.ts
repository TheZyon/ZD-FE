import {Component, Input, OnInit} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {cld} from "../../../environments/cloudinary";
import {ProfilePicsService} from "../../services/profile-pics.service";
import {ProfilePic} from "../../models/profilePic";
import {ImgsCarouselObject} from "../../utils/picsUtils";
import {getUsername} from "../../../environments/environment";
import {BehaviorSubject, concatMap} from "rxjs";


@Component({
  selector: 'app-example-cloudinary',
  templateUrl: './example-cloudinary.component.html',
  styleUrls: ['./example-cloudinary.component.scss']
})
export class ExampleCloudinaryComponent implements OnInit{

  infoImgs: ImgsCarouselObject;
  myWidget = this.picsSrv.myWidget;

  editMode=new BehaviorSubject<boolean>(false);
  isOfLoggedUser: boolean=false;
  @Input() username: string;
  @Input() username$: BehaviorSubject<string>;
  constructor(private picsSrv: ProfilePicsService) {
  }

  /*
 * 1. GET request al BE per ottenere dto immagini del user
 * 2. usa  i public_id dei dto ottenuti dal BE per chiedere ad API Cloudinary le immagini
 * 3. crea un ImgCarouselObject con le immagini
 * */
  ngOnInit(): void {


    if(!this.username$) this.username$ = new BehaviorSubject<string>(getUsername()); /*se npn si è ricevuto il subject dal padre, lo inizializzi con il nome dell'utente loggato*/

    this.username$.pipe(concatMap(username=> {

      this.isOfLoggedUser= username == getUsername()

      return this.picsSrv.getByUsername(username)
    }))
    .subscribe(res=>{ //1.

      let imgArray: CloudinaryImage[]=[];

      res.forEach((dto: ProfilePic)=> imgArray.push(cld.image(`${dto.public_id}`))) //2.

      this.infoImgs= new ImgsCarouselObject(imgArray); //3.
      this.infoImgs.resizePics();

    },
      error => console.log("error in PICSRV: ", error.message))
  }

}
