import { Habitacion } from './models/huesped';
import { Injectable } from '@angular/core';
import { Huesped } from "src/app/models/huesped";

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private huespeds: Huesped[];
  private habitacion: Habitacion[];

  constructor() {
    this.huespeds = [
      {
        name: "Huesped1",
        phone: "3111934812",
        dateAdmission: "2022-11-20T09:46:26.329Z",
        departureDate: "2022-11-25T09:46:26.329Z",
        room: "A1",
        token: "qhroiwqhklbkljfksa"
      }];
    this.habitacion = [
      {
        hab: "A1",
        code: "4578",
        price: 500
      },{
        hab: "A2",
        code: "7864",
        price: 5000
      },{
        hab: "B1",
        code: "9887",
        price: 100
      },{
        hab: "B2",
        code: "1278",
        price: 1000
      },{
        hab: "C1",
        code: "3633",
        price: 599
      },{
        hab: "C2",
        code: "5210",
        price: 1599
      }
    ]
  }

  public getHuespeds(): Huesped[]{
    return this.huespeds;
  }

  public getCodeByRoom(room:String):String{
    let item : Habitacion;
    item = this.habitacion.find(
      (habitacion)=>{
        return habitacion.hab==room;
      }
    );
    return item.code;
  }

  public getHuespedByToken(tkn:string): Huesped{
    let item : Huesped;
    item = this.huespeds.find(
      (huesped)=>{
        return huesped.token==tkn;
      }
    );
    return item;
   }

   public getHuespedByRoom(rm:string): Huesped{
    let item : Huesped;
    item = this.huespeds.find(
      (huesped)=>{
        return huesped.room==rm;
      }
    );
    return item;
   }

  public newHuesped(huesped:Huesped):void{
    this.huespeds.push(huesped);
   }

  public removeHuesped(pos:number):void{
    this.huespeds.splice(pos,1);
  }

  public studentLogin(tok: String): Huesped{
    let item: Huesped;
    item = this.huespeds.find(
      (huesped)=> {
        return huesped.token==tok;
      }
    );
    return item;
  }
}
