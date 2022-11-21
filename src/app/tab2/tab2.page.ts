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

  public getCodeByRoom(room:String):String{
    return this.huespedService.getCodeByRoom(room);
  }

  public enFecha(llegada:String, salida:String):Boolean{
    let fecha = new Date;
    console.log(fecha.toISOString());
    
    return (llegada <= fecha.toISOString() && salida >= fecha.toISOString());
  }

  public restante(room:String, ant:number): String{
    return this.huespedService.restante(room, ant);
  }

}
