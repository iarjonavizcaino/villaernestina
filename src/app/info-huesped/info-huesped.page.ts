import { Component, OnInit } from '@angular/core';
import { HuespedService } from '../huesped.service';
import { Huesped } from '../models/huesped';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-huesped',
  templateUrl: './info-huesped.page.html',
  styleUrls: ['./info-huesped.page.scss'],
})
export class InfoHuespedPage implements OnInit {

  public huesped: Huesped;

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) { }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (params)=>{
        //console.log(params);
        this.huesped = this.huespedService.getHuespedByToken(params['token']);
      }
    );
  }

}