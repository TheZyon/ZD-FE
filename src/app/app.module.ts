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


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProvaComponent,
        CarouselUsersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileModule
    ],
    providers: [],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
