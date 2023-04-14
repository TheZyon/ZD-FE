import {Component, OnInit} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {cld} from "../../../environments/cloudinary";
import {ProfilePicsService} from "../../services/profile-pics.service";
import {ProfilePic} from "../../models/profilePic";
import {ImgsCarouselObject} from "../../utils/picsUtils";


@Component({
  selector: 'app-example-cloudinary',
  templateUrl: './example-cloudinary.component.html',
  styleUrls: ['./example-cloudinary.component.scss']
})
export class ExampleCloudinaryComponent implements OnInit{

  infoImgs: ImgsCarouselObject;
  myWidget = this.picsSrv.myWidget;


  constructor(private picsSrv: ProfilePicsService) {
  }

  /*
 * 1. GET request al BE per ottenere dto immagini del user
 * 2. usa  i public_id dei dto ottenuti dal BE per chiedere ad API Cloudinary le immagini
 * 3. crea un ImgCarouselObject con le immagini
 * */
  ngOnInit(): void {
    this.picsSrv.getByUsername().subscribe(res=>{ //1.

      let imgArray: CloudinaryImage[]=[];

      res.forEach((dto: ProfilePic)=> imgArray.push(cld.image(`${dto.public_id}`))) //2.

      this.infoImgs= new ImgsCarouselObject(imgArray); //3.
      this.infoImgs.resizePics();

    })
  }




// Import the Cloudinary classes.


/*https://res.cloudinary.com/dk4tnmdfd/image/upload/v1681394994/pm457upfgmbylrbjugee.jpg*/




}



