import { Injectable } from '@angular/core';
import { Huesped } from "src/app/models/huesped";

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private huespeds: Huesped[];

  constructor() { 
    this.huespeds =[
      {
        name: "Huesped1",
        phone: "3111934812",
        dateAdmission: "2022-11-20T09:46:26.329Z",
        departureDate:"2022-11-25T09:46:26.329Z",
        room:"A1",
        token:"qhroiwqhklbkljfksa"
      }]
  }

  public getHuespeds(): Huesped[]{
    return this.huespeds;
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
