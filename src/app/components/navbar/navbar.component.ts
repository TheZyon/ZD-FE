import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {UserDetailsService} from "../../services/user-details.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isLoggedIn: boolean = false;

    constructor(private authSrv: AuthService, public detailsSrv: UserDetailsService, private notificSrv: NotificationsService) { }

    ngOnInit(): void {
        this.authSrv.isLoggedIn$.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
        });
    }

    onLogout() {
        this.authSrv.logout();
    }


}
