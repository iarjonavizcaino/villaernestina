import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped, Room } from '../models/huesped';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  public huesped:Huesped;
  public room:Room;

  constructor(public translate : TranslateService,private huespedService:HuespedService) { 
  }

  ngOnInit() {
    this.huesped = this.huespedService.getHuespedByToken(this.huespedService.getToken());
    this.room = this.huespedService.getRoom(this.huesped.room);
  }


}
