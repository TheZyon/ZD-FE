import {Component, Input} from '@angular/core';
import {demoDetails, UserDetails} from "../../models/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crush-view',
  templateUrl: './crush-view.component.html',
  styleUrls: ['./crush-view.component.scss']
})
export class CrushViewComponent {

  @Input() details: UserDetails=demoDetails;


  constructor(private router: Router) {
  }
  navigateToCrushSnapshot(){
    this.router.navigate(['/crush',{infoCrush: JSON.stringify(this.details)}])
  }

  navigateToChatWithCrush(){
    console.log("da implementare!!");
  }

}
