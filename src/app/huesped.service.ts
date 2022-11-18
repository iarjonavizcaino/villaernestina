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
        name: "",
        phone: "",
        dateAdmission: "",
        departureDate:"",
        room:"",
        token:""
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

   public getHuespedByDate(dt:string): Huesped{
    let item : Huesped;
    item = this.huespeds.find(
      (huesped)=>{
        return huesped.dateAdmission==dt;
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
}
