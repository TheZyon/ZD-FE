import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    coco= "coco";
  constructor() { }

  ngOnInit(): void {
  }

  stampaEvento(e:any){
      console.log(e);
  }
}
