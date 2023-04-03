import { Component } from '@angular/core';
import {UserDetailsService} from "../../services/user-details.service";
import {demoDetails, UserDetails} from "../../models/models";

@Component({
  selector: 'app-carousel-users',
  templateUrl: './carousel-users.component.html',
  styleUrls: ['./carousel-users.component.scss']
})
export class CarouselUsersComponent {

  constructor(private detailSrv: UserDetailsService) {



  }
}
