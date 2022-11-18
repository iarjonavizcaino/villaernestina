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
        room:""
      }]
  }

  public getHuespeds(): Huesped[]{
    return this.huespeds;
  }

  public newHuesped(huesped:Huesped):void{
    this.huespeds.push(huesped);
   }
}
