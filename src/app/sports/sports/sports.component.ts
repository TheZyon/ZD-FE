import { Component, OnInit } from '@angular/core';
import { Sport, SportsService } from '../sports.service';
import { catchError } from 'rxjs';
import {HttpService} from "../../services/http.service";
import {urlBaseBE} from "../../../environments/environment";
import {Fattura} from "../../models/models";

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']

})
export class SportsComponent implements OnInit {

  fatture:Fattura[] = []

  getFattureUrl=urlBaseBE+"/api/test/fatture";

  constructor(private httpSrv:HttpService) { }

  ngOnInit(): void {
  }

  getClienti(){
      this.httpSrv.get(this.getFattureUrl).subscribe(res=>{
     console.log(res);
     this.fatture=res.content as Fattura[];
      })
  }

}
