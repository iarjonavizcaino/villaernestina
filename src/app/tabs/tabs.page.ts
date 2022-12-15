import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isButtonDisabled: boolean;
  public huesped: Huesped;

  constructor(public translate : TranslateService, huespedService:HuespedService) {
    this.huesped = huespedService.getHuespedByToken(huespedService.getToken());
    let fecha = new Date;
    if(this.huesped.dateAdmission <= fecha.toISOString() &&  this.huesped.departureDate >= fecha.toISOString()){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }

  }


}
