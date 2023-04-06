// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {InjectionToken} from "@angular/core";

export const environment = {
  production: false
};
export const urlBaseBE="http://localhost:9000";
export const urlSignUp=urlBaseBE+"/api/auth/signup";
export const urlLogIn= urlBaseBE+"/api/auth/login";

export const urlUserDetails = urlBaseBE + "/api/details";
export const urlAllUserDetails= urlUserDetails+"/all"; //aggiungere pagina
export const urlUserDetailsByUsername= urlUserDetails + "/username"; //aggiungere username

export const urlGetLikesByLiker=urlBaseBE+ "/api/likes/byUsernameLiker"; //aggiungere username
export const urlPostLike= urlBaseBE + "/api/likes";
export const USERNAME_TOKEN = new InjectionToken<string| null>('token containing logged user username');
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
