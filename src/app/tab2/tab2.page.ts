import { Component } from '@angular/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped, Room } from '../models/huesped';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  public huespeds:Huesped[];
  public rooms:Room[];
  public token:string;

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) {
    this.huespeds = [{
      name: "",
      phone: "",
      dateAdmission: "",
      departureDate: "",
      room: "",
      advance: 0,
      token: "",
    }];
    
  }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (params)=>{
        this.token = params['token'];
        this.huespedService.getHuespedsByTokenToShow(params['token']).subscribe(res =>{
          this.huespeds = res;
        })

      }
    );

  }

  public getCodeByRoom(room:String):String{
    //return this.huespedService.getCodeByRoom(room);
    this.huespedService.getRooms().subscribe(res =>{
      this.rooms = res;
      //console.log(this.huespeds);
    })
    return this.getCode(room);
  }

  public enFecha(llegada:String, salida:String):Boolean{
    let fecha = new Date;
    
    return (llegada <= fecha.toISOString() && salida >= fecha.toISOString());
  }

  public getCode(room:String):String{
    let item : Room;
    item = this.rooms.find(
      (habitacion)=>{
        return habitacion.name==room;
      }
    );
    return item.code;
  }



}
