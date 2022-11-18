import { Component } from '@angular/core';
import { HuespedService } from '../huesped.service';
import { Huesped } from '../models/huesped';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public huesped:Huesped;

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) {}

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (params)=>{
        //console.log(params);
        this.huesped = this.huespedService.getHuespedByToken(params['token']);
      }
    );
  }

}
