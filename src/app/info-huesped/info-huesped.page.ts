import { Component, OnInit } from '@angular/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-huesped',
  templateUrl: './info-huesped.page.html',
  styleUrls: ['./info-huesped.page.scss'],
})
export class InfoHuespedPage implements OnInit {

  public huespeds: Huesped[];

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) {
    this.huespeds = [{
      name: '',
      phone: '',
      dateAdmission: '',
      departureDate: '',
      room: '',
      advance: 0,
      token: '',
    }]
   }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (params)=>{
        //console.log(params);
        //this.huesped = this.huespedService.getHuespedByToken(params['token']);
        this.huespedService.getHuespedsByTokenToShow(params['token']).subscribe(res =>{
          this.huespeds = res;
          console.log(this.huespeds);
        })
      }
    );
  }

}