import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {demoDetails, UserDetails} from "../../models/models";

@Component({
  selector: 'app-crush-snapshot',
  templateUrl: './crush-snapshot.component.html',
  styleUrls: ['./crush-snapshot.component.scss']
})
export class CrushSnapshotComponent implements OnInit, OnDestroy{

  details: UserDetails= demoDetails;
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  this.details= JSON.parse(this.route.snapshot.paramMap.get('infoCrush')); //dettagli ricevuti tramite la ActivatedRoute
  }

  ngOnDestroy(): void {
  }

}
