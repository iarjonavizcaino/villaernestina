import { Room } from '../models/huesped';
import { Injectable } from '@angular/core';
import { Huesped } from "src/app/models/huesped";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private token: string;
  private huespeds: Huesped[];
  private rooms: Room[];
  private today: any;

  constructor(private firestore: AngularFirestore) {
    /*this.huespeds = [
      {
        name: "Huesped1",
        phone: "+523111934812",
        dateAdmission: "2022-11-20T09:46:26.329Z",
        departureDate: "2022-11-25T09:46:26.329Z",
        room: "A1",
        advance: 350.50,
        photo:"",
        token: "abcdefghijk"
      }];
    this.rooms = [
      {
        room: "A1",
        code: "4578",
        price: 500
      }, {
        room: "A2",
        code: "7864",
        price: 5000
      }, {
        room: "B1",
        code: "9887",
        price: 100
      }, {
        room: "B2",
        code: "1278",
        price: 1000
      }, {
        room: "C1",
        code: "3633",
        price: 599
      }, {
        room: "C2",
        code: "5210",
        price: 1599
      }
    ]*/

    this.getDate();

    this.getHuespeds().subscribe(res=>{
      this.huespeds = res;
    });

  }

  getDate() { 
     this.today = new Date(); 
    this.today = this.today.toISOString();}

  public getHuespeds(): Observable<Huesped[]> {
    //return this.huespeds;
    return this.firestore.collection('Huesped').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }


  public getHuespedsByTokenToShow(tkn: string): Observable<Huesped[]> {
    //return this.huespeds;
    return this.firestore.collection('Huesped', ref => ref.where('token', '==', tkn)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getRooms(): Observable<Room[]> {
    //return this.huespeds;
    return this.firestore.collection('Room').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Room;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getHuespedByToken(tkn: string):Huesped{
    return this.huespeds.find(huesped=>{
        return huesped.token===tkn;
      }
    );
  }

  public getHuespedByRoom(rm: string) {
    let result = this.firestore.collection('Huesped', ref => ref.where('room', '==', rm)).valueChanges();
    return result;
  }

  public getFechasByRoom(rm: string): Observable<Huesped[]> {
    //return this.huespeds;
    return this.firestore.collection('Huesped', ref => ref.where('room', '==', rm)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public newHuesped(huesped: Huesped): void {
    //this.huespeds.push(huesped);
    this.firestore.collection('Huesped').doc(huesped.token).set(huesped);
  }

  public removeHuesped(id: string): void {
    //this.huespeds.splice(pos,1);
    this.firestore.collection('Huesped').doc(id).delete();
  }

  public setToken(hues:string):void{
    this.token = hues;
  }

  public getToken(): string{
    return this.token;
  }


  public filterByDateAdmission():  Observable<Huesped[]> {
    return this.firestore.collection('Huesped', ref => ref.where('dateAdmission', '>=', this.today)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public filterByLionRoom(): Observable<Huesped[]> {
    return this.firestore.collection('Huesped', ref => ref.where('room', '==', 'León')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public filterByElephantRoom(): Observable<Huesped[]> {
    return this.firestore.collection('Huesped', ref => ref.where('room', '==', 'Elefante')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  /*public getRooms(): Room[]{
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

  

   public getHuespedByRoom(rm:string): Huesped{
    let item : Huesped;
    item = this.huespeds.find(
      (huesped)=>{
        return huesped.room==rm;
      }
    );
    return item;
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


  public restante(room:String, ant:number): number{
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
  }*/



}
