import {Component, Input, OnInit} from '@angular/core';
import {ImgsCarouselObject} from "../../utils/picsUtils";


@Component({
  selector: 'app-carousel-user-images',
  templateUrl: './carousel-user-images.component.html',
  styleUrls: ['./carousel-user-images.component.scss']
})
export class CarouselUserImagesComponent implements OnInit{


  @Input() imagesInfo: ImgsCarouselObject;



  /*
  *
  * */
  ngOnInit(): void {

  }




}
