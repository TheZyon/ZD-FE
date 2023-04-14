import {Cloudinary} from "@cloudinary/url-gen";
import {getUsername} from "./environment";

export const CLOUDINARY_URL='cloudinary://813875163651845:CgFhI_JEB4mftmDmP2bxNCqPeeg@dk4tnmdfd';
export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dk4tnmdfd'
  }
});


