import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import {CarouselUsersComponent} from "./components/carousel-users/carousel-users.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";


const routes: Routes = [

  {
    path: '',
    //non possiamom impostare il component della rotta perchèm non vogliamo caricarlo finche non ci serve
    //usiamo loadChildren (lazy loading) per caricare un modulo (con il suo routing) solo quando la rotta è raggiunta
    loadChildren: () => {
      return import('src/app/components/home/home.module').then(m => m.HomeModule)
    }
  },
  {
    path:'user',
    component:UserPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'users',
    component: CarouselUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userUtils',
    loadChildren: ()=>{return import('src/app/user-profile/user-profile.module').then((m)=>{return m.UserProfileModule})}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
