import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CleaningReport } from '../models/cleaning';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  constructor(private firestore: AngularFirestore) {
    this.checkAndPrepopulate();
  }

  private checkAndPrepopulate() {
    this.firestore.collection('Cleanings').valueChanges().pipe(
      take(1)
    ).subscribe(records => {
      if (!records || records.length === 0) {
        console.log('Collection Cleanings is empty. Prepopulating mock data...');
        this.prepopulateMockData();
      }
    });
  }

  private prepopulateMockData() {
    const mockData: CleaningReport[] = [
      {
        accommodation: "Bungalow León",
        date: "2026-06-22",
        cleaner: "María Gómez",
        guest: "Familia García",
        timeStart: "09:00",
        timeEnd: "09:45",
        duration: 45,
        cleanliness: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13"],
        hardware: ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12"],
        kitchenInventoried: true,
        kitchenOk: true,
        kitchenNotes: "",
        incidentSeverity: "Normal",
        incidentDetails: "",
        generalNotes: "Alojamiento en excelentes condiciones. Se dejaron flores de bienvenida.",
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      },
      {
        accommodation: "Glamping Colibrí",
        date: "2026-06-21",
        cleaner: "Juan Carlos Solís",
        guest: "Alejandra Ruiz",
        timeStart: "14:15",
        timeEnd: "15:05",
        duration: 50,
        cleanliness: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c13"],
        hardware: ["h1", "h2", "h6", "h7", "h8", "h9", "h10", "h11", "h12"],
        kitchenInventoried: true,
        kitchenOk: false,
        kitchenNotes: "Falta una taza de cerámica del juego de café.",
        incidentSeverity: "Menor",
        incidentDetails: "El ventilador de pedestal hace un ruido extraño en la velocidad 3.",
        generalNotes: "Todo el resto en orden.",
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      },
      {
        accommodation: "Bungalow Elefante",
        date: "2026-06-20",
        cleaner: "María Gómez",
        guest: "Roberto Hernández",
        timeStart: "11:00",
        timeEnd: "11:55",
        duration: 55,
        cleanliness: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13"],
        hardware: ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h11", "h12"],
        kitchenInventoried: true,
        kitchenOk: true,
        kitchenNotes: "",
        incidentSeverity: "Crítico",
        incidentDetails: "La caldera de agua caliente no enciende. El piloto no prende.",
        generalNotes: "Se requiere intervención urgente del técnico antes de que entre el siguiente huésped.",
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      }
    ];

    for (const report of mockData) {
      this.firestore.collection('Cleanings').add(report);
    }
  }

  public getCleanings(): Observable<CleaningReport[]> {
    return this.firestore.collection('Cleanings', ref => ref.orderBy('date', 'desc')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as CleaningReport;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public addCleaning(report: CleaningReport): Promise<any> {
    return this.firestore.collection('Cleanings').add(report);
  }

  public removeCleaning(id: string): Promise<void> {
    return this.firestore.collection('Cleanings').doc(id).delete();
  }

}
