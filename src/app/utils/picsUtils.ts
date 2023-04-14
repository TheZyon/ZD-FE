import {CloudinaryImage} from "@cloudinary/url-gen";
import {mod} from "./modulo";
import {fill} from "@cloudinary/url-gen/actions/resize";


export class ImgsCarouselObject {/*class for handling the custom image carousel associated to a CloudinaryImage[]*/
  images: CloudinaryImage[];
  imgsSize: number;
  thereAreNoImgs: boolean = true;
  currentIndex: number = 0;

  constructor(images: CloudinaryImage[]) {
    this.images = images;
    this.imgsSize = images.length;
    this.thereAreNoImgs = images.length == 0;
  }

  nextPic() {
    this.currentIndex = mod(this.currentIndex + 1, this.imgsSize);
    return this.currentIndex;
  }

  prevPic() {
    this.currentIndex = mod(this.currentIndex - 1, this.imgsSize);
    return this.currentIndex;
  }

  getCurrentPic() {
    return this.images[this.currentIndex];
  }

  resizePics(){ /*resizes all pics*/
    this.images.map(img=>picResize(img));
  }
}


export function picResize(pic: CloudinaryImage): CloudinaryImage{
    return pic.resize(fill().width(250).height(250));
}