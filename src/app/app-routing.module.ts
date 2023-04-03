import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import {CarouselUsersComponent} from "./components/carousel-users/carousel-users.component";


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
    path:'users',
    component:CarouselUsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'sports',
    loadChildren: ()=>{return import('./sports/sports.module').then((m)=>{return m.SportsModule})},
    canActivate: [AuthGuard]
  },
  {
    path:'userDetails',
    loadChildren: ()=>{return import('src/app/user-profile/user-profile.module').then((m)=>{return m.UserProfileModule})},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
