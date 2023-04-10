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

import { CrushesComponent } from './components/crushes/crushes.component';
import { CrushSnapshotComponent } from './components/crush-snapshot/crush-snapshot.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ChatMessageComponent } from './library/chat-message/chat-message.component';
import {chatMessagesReducer} from "./ngRxState/chat-message.reducer";





@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProvaComponent,
        CarouselUsersComponent,
        UserPageComponent,
        NotificationsComponent,
        CrushesComponent,
        CrushSnapshotComponent,
        ChatPageComponent,
        ChatMessageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileModule,
        StoreModule.forRoot({usersDetails: userDetailsReducer, likes: sentLikesReducer, receivedLikes:receivedLikesReducer, notifications: notificationsReducer, chatMessage: chatMessagesReducer})
    ],
    providers: [
      // {provide: USERNAME_TOKEN, useFactory: loggedUserUsername, deps:[AuthService]}
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
