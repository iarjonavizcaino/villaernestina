import { Room } from '../models/huesped';
import { Injectable } from '@angular/core';
import { Huesped } from "src/app/models/huesped";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';
import { StringFormat } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private token: string;
  private huespeds: Huesped[];
  private rooms: Room[];
  private today: any;

  constructor(private firestore: AngularFirestore, private router: Router) {

    this.getDate();

    this.getHuespeds().subscribe(res => {
      this.huespeds = res;
    });

    this.getRooms().subscribe(res => {
      this.rooms = res;
    });

  }

  getDate() {
    this.today = new Date();
    console.log(this.today.toISOString());
    this.today = this.today.toISOString().substring(0, 11)+"00:00:00-00:00";
    //this.today = this.today
  }

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

  public getHuespedByToken(tkn: string): Huesped {
    // console.log("Token enviado " + tkn);
    if (tkn && tkn != undefined)
      return this.huespeds.find(huesped => {
        return huesped.token === tkn;
      }
      ); else {
      // console.log('Navegando...');
      this.router.navigate(['']);
      return null;
    }
  }

  public getRoom(rm: string): Room {
    return this.rooms.find(room => {
      return room.name === rm;
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

  public setToken(hues: string): void {
    this.token = hues;
  }

  public getToken(): string {
    return this.token;
  }

  public filterByDateAdmission(): Observable<Huesped[]> {
    console.log(this.today);
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

  public filterByProcess(): Observable<Huesped[]> {
    let now = new Date();
    // console.log(now);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    //console.log(now.toISOString());
    let fecha = now.toISOString().substring(0, 19) + "-00:00";
    const result = this.firestore.collection('Huesped', ref => ref.where('departureDate', '>=', fecha)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
    
    return result;
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

  public updatePay(huesped:Huesped) {
    huesped.advance=huesped.price;
    return this.firestore
    .collection('Huesped')
    .doc(huesped.id)
    .update(huesped);
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
