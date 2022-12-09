import { Component } from '@angular/core';
import { HuespedService } from '../huesped.service';
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

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) {}

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

  public getCodeByRoom(room:String):String{
    //return this.huespedService.getCodeByRoom(room);
    this.huespedService.getRooms().subscribe(res =>{
      this.rooms = res;
      console.log(this.huespeds);
    })
    return this.getCode(room);
  }

  public enFecha(llegada:String, salida:String):Boolean{
    let fecha = new Date;
    
    return (llegada <= fecha.toISOString() && salida >= fecha.toISOString());
  }

  public restante(room:String, ant:number): number{
    return this.restanteAux(room, ant);
  }

  public getCode(room:String):String{
    let item : Room;
    item = this.rooms.find(
      (habitacion)=>{
        return habitacion.room==room;
      }
    );
    return item.code;
  }

  public restanteAux(room:String, ant:number): number{
    let item : Room;
    item = this.rooms.find(
      (habitacion)=>{
        return habitacion.room==room;
      }
    );
    if(item.price<=ant){
      return 0;//"Costo cubierto totalmente :D";
    }else{
      return item.price - ant;//"$" + (item.price - ant) + " MXN";
    }
  }

}
