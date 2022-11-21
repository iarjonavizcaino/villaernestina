import { Component, OnInit } from '@angular/core';
import { Huesped, Room } from 'src/app/models/huesped';
import { HuespedService } from '../huesped.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-huesped',
  templateUrl: './new-huesped.page.html',
  styleUrls: ['./new-huesped.page.scss'],
})
export class NewHuespedPage implements OnInit {

  public huesped: Huesped;
  public rooms: Room[];
  public myForm: FormGroup;
  public validatorMessages: Object;
  public today: any;
  public dateSelected: any;
  constructor(private huespedService:HuespedService, private fb:FormBuilder, private router:Router, private toastController: ToastController) { }

  ngOnInit() {
    this.getDate();
    this.rooms = this.huespedService.getRooms();
    this.myForm = this.fb.group({
      name:["",Validators.required],
      phone:["",Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')])],
      dateAdmission:["",Validators.required],
      departureDate:["",Validators.required],
      room:["",Validators.required],
      advance:["",Validators.compose([Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])]
    });
    this.validatorMessages = {
      name: [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      phone: [
        { type: 'required', message: "Teléfono obligatorio" },
        { type: 'minlength', message: "El Teléfono debe ser de mínimo 10 digitos" },
        { type: 'maxlength', message: "El Teléfono debe ser de máximo 10 digitos" },
        { type: 'pattern', message: "El Teléfono deben ser solo números. Ej. 3113331111" }
      ],
      dateAdmission: [
        { type: 'required', message: "Fecha de entrada obligatoria" }
      ],
      departureDate: [
        { type: 'required', message: "Fecha de salida obligatoria" }
      ],
      room: [
        { type: 'required', message: "Cuarto obligatorio" }
      ],
      advance: [
        { type: 'required', message: "Anticipo obligatorio" },
        { type: 'pattern', message: "Entrada incorrecta, favor de escibir solo números enteros o decimales" }
      ]
    }
  }

  getDate() { const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() + 1)).slice(-2); console.log(this.today); }

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

  public newHuesped(data):void{
    if(this.checkRoom(data['room'],data['dateAdmission'])){
      if(this.checkAdvance(data['room'],data['advance'])){
        //Construir el objeto
        data.token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
        console.log(data);
        this.huesped = data;
        this.huespedService.newHuesped(this.huesped);
        this.presentToast();
        this.router.navigate(['/view-huesped']);
      }else{
        this.presentToastAdvance();
      }
    }else{
      this.presentToastRoom();
    }
  }

  public checkRoom(room,dA){
    console.log(this.huespedService.getHuespedByRoom(room));
    if(this.huespedService.getHuespedByRoom(room)){
      if(this.huespedService.getHuespedByRoom(room).departureDate.substring(0,10) >= dA.substring(0,10)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  public checkAdvance(room,ad){
    let adMin, adMax;
    adMin = this.huespedService.getPriceRoom(room) * .30;
    adMax = this.huespedService.getPriceRoom(room);
    if(ad<adMin || ad>adMax){
      return false;
    }else{
      return true;
    }
  }

}
