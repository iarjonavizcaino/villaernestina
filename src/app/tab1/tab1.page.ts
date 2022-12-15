import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  langs:string[] = [];
  huesped: Huesped;
  public fecha: Date;

  constructor(public translate : TranslateService, huespedService: HuespedService) {
   // this.langs = this.translateService.getLangs();
   this.fecha = new Date;
   this.huesped = huespedService.getHuespedByToken(huespedService.getToken());
  }

  /*changeLang(event){
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }*/

}
