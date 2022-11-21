import { Room } from './models/huesped';
import { Injectable } from '@angular/core';
import { Huesped } from "src/app/models/huesped";

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private huespeds: Huesped[];
  private rooms: Room[];

  constructor() {
    this.huespeds = [
      {
        name: "Huesped1",
        phone: "3111934812",
        dateAdmission: "2022-11-20T09:46:26.329Z",
        departureDate: "2022-11-25T09:46:26.329Z",
        room: "A1",
        advance:0.0,
        token: "qhroiwqhklbkljfksa"
      }];
    this.rooms = [
      {
        room: "A1",
        code: "4578",
        price: 500
      },{
        room: "A2",
        code: "7864",
        price: 5000
      },{
        room: "B1",
        code: "9887",
        price: 100
      },{
        room: "B2",
        code: "1278",
        price: 1000
      },{
        room: "C1",
        code: "3633",
        price: 599
      },{
        room: "C2",
        code: "5210",
        price: 1599
      }
    ]
  }

  public getHuespeds(): Huesped[]{
    return this.huespeds;
  }

  public getRooms(): Room[]{
    return this.rooms;
  }

  public getPriceRoom(r:String): number{
    let item : Room;
    item = this.rooms.find(
      (habitacion)=>{
        return habitacion.room==r;
      }
    );
    return item.price;
  }

  public getCodeByRoom(room:String):String{
    let item : Room;
    item = this.rooms.find(
      (habitacion)=>{
        return habitacion.room==room;
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
