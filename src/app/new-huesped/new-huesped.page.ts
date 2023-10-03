import { Component, OnInit, ViewChild } from '@angular/core';
import { Huesped, Room } from 'src/app/models/huesped';
import { HuespedService } from '../services/huesped.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-huesped',
  templateUrl: './new-huesped.page.html',
  styleUrls: ['./new-huesped.page.scss'],
})
export class NewHuespedPage implements OnInit {

  public huesped: Huesped;
  public huespedsDates: Huesped[];
  public rooms: Room[];
  public roomSelected: Room;
  public myForm: FormGroup;
  public validatorMessages: Object;
  public today: any;
  public dayDeparture: any;
  public dateSelected: any;
  public isContentLoaded: boolean = false;
  public rest = 0;
  @ViewChild('inname', { static: false }) inName!: IonInput;


  constructor(private huespedService: HuespedService, private fb: FormBuilder, private router: Router, private toastController: ToastController) {
    this.huespedsDates = [{
      name: "",
      phone: "",
      dateAdmission: "",
      departureDate: "",
      room: "",
      // advance: 0,
      token: "",
      gender: "",
      platform: "Airbnb",
      price: 0,
      advance: 0
    }];

    this.getDate();
    this.huespedService.getRooms().subscribe(res => {
      this.rooms = res;
      // this.inName.setFocus();
      this.roomSelected = res[0];
      //console.log(this.roomSelected);
    });

 



    this.myForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(17), Validators.pattern(/\+\d+/)])],
      dateAdmission: [this.today, Validators.required],
      departureDate: [this.dayDeparture, Validators.required],
      room: ["Elefante", Validators.required],
      gender: ["woman", Validators.required],
      platform: ["airbnb", Validators.required],
      price: [0],
      advance: [0]
    });
    this.validatorMessages = {
      name: [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      phone: [
        { type: 'required', message: "Teléfono obligatorio" },
        { type: 'minlength', message: "El Teléfono debe ser de mínimo 12 digitos" },
        { type: 'maxlength', message: "El Teléfono debe ser de máximo 17 digitos" },
        { type: 'pattern', message: "El Teléfono debe ser solo la lada y los números. Ej. +523113331111" }
      ],
      dateAdmission: [
        { type: 'required', message: "Fecha de entrada obligatoria" }
      ],
      departureDate: [
        { type: 'required', message: "Fecha de salida obligatoria" }
      ],
      room: [
        { type: 'required', message: "Cuarto obligatorio" }
      ]
    }


    this.myForm.get('dateAdmission').valueChanges.subscribe(selectedValue => {
      console.log("Fecha seleccionada: "+selectedValue);
      let newDay = new Date(selectedValue);
      newDay.setDate(newDay.getDate() + 2);
      console.log("Fecha nueva: "+newDay);
      this.dayDeparture = newDay.getFullYear() + '-' + ('0' + (newDay.getMonth() + 1)).slice(-2) + '-' + ('0' + (newDay.getDate())).slice(-2);
      console.log(this.dayDeparture);
      this.myForm.get("departureDate").setValue(this.dayDeparture);
    });

    
  }

  ngOnInit() {
    
    
    
    
  }

  getDate() {
    const date = new Date();
    this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2); /*console.log(this.today);*/
    date.setDate(date.getDate()+1);
    this.dayDeparture = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2); /*console.log(this.today);*/
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Huesped agregado',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async presentToastRoom() {
    const toast = await this.toastController.create({
      message: 'Habitación no disponible para las fechas que requiere',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async presentToastAdvance() {
    const toast = await this.toastController.create({
      message: 'Anticipo no válido. Debe ser mayor al 30% o igual al total de la habitación!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  ionViewDidEnter() {
    this.isContentLoaded = true;
    setTimeout(() => {
      this.inName.setFocus();
    }, 2000);
  }

  public newHuesped(data): void {
    if (this.checkRoom(data['room'], data['dateAdmission'])) {
      //Construir el objeto
      data.token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);

      data.dateAdmission = data.dateAdmission.substring(0, 11) + "T00:00:00-07:00";
      data.departureDate = data.departureDate.substring(0, 11) + "T14:00:00-07:00";
      //console.log(data);


      this.huesped = data;
      this.huespedService.newHuesped(this.huesped);
      this.presentToast();
      this.router.navigate(['/view-huesped']);
    } else {
      this.presentToastRoom();
    }
  }

  public changeRoom() {
    let room = this.myForm.get("room").value;

    console.log("Room"+room);
    
    let platform = this.myForm.get("platform").value;
    console.log("platform"+platform);

    this.roomSelected = this.rooms.find(elem => {
      return elem.name === room;
    });

    console.log(this.roomSelected);

    if(platform==="airbnb") {
      this.myForm.get('price').setValue(0);
      this.myForm.get('advance').setValue(0);
      this.rest = 0;
    } else if(platform==="direct") {
      this.myForm.get('price').setValue(this.roomSelected.price);
      this.myForm.get('advance').setValue(this.roomSelected.price/2);

      this.rest = this.roomSelected.price/2;
    }

    
  }

  public checkRoom(room, dA) {

    if (this.huespedService.getHuespedByRoom(room)) {

      this.huespedService.getFechasByRoom(room).subscribe(res => {
        this.huespedsDates = res;

      })
      let item = true;

      this.huespedsDates.forEach(
        (huesped) => {
          if (huesped.departureDate.substring(0, 10) >= dA.substring(0, 10)) {

            item = false;
          }
        });

      if (!item) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  public getRest(price: number, advance: number) {
    this.rest = price - advance;
  }

  public changePrice(platform: string) {
    console.log(platform);

    let price = this.rooms

    if (platform === "airbnb") {
      this.myForm.get('price').setValue(0);
      this.myForm.get('advance').setValue(0);
      this.rest = 0;
    }
    if (platform === "airbnb") {
      this.myForm.get('price').setValue(1150);
      this.myForm.get('advance').setValue(0);
      this.rest = 0;
    }
  }

  getForm() {
    console.log(this.myForm.valid);
  }

  closeModal() {

  }


  /*public  checkDates(dA){
    let item = true;
    
    this.huespedsDates.forEach(
      (huesped) => {
        if(huesped.departureDate.substring(0,10) >= dA.substring(0,10)){
          //console.log(huesped);
          item = false;
        }
      }
    )
    //await this.delay(100);
    console.log(item);
    return item;
  }*/


}
