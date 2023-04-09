import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProvaComponent } from './prova-se_sei_loggato/prova.component';
import{FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { CarouselUsersComponent } from './components/carousel-users/carousel-users.component';
import {UserProfileModule} from "./user-profile/user-profile.module";
import {StoreModule} from '@ngrx/store';
import {userDetailsReducer} from "./ngRxState/user-details.reducer";
import { UserPageComponent } from './components/user-page/user-page.component';
import {sentLikesReducer} from "./ngRxState/sentLikesReducer";
import {receivedLikesReducer} from "./ngRxState/received-likes.reducer";
import { NotificationsComponent } from './components/notifications/notifications.component';
import {notificationsReducer} from "./ngRxState/notifications.reducer";





@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProvaComponent,
        CarouselUsersComponent,
        UserPageComponent,
        NotificationsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileModule,
        StoreModule.forRoot({usersDetails: userDetailsReducer, likes: sentLikesReducer, receivedLikes:receivedLikesReducer, notifications: notificationsReducer})
    ],
    providers: [
      // {provide: USERNAME_TOKEN, useFactory: loggedUserUsername, deps:[AuthService]}
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
