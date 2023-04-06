import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import {CarouselUsersComponent} from "./components/carousel-users/carousel-users.component";
import {UserPageComponent} from "./components/user-page/user-page.component";


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
    path:'userPage',
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
    loadChildren: ()=>{return import('src/app/notifications/notifications.module').then((m)=>{return m.NotificationsModule})},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
