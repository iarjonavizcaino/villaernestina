import { Component, OnInit } from '@angular/core';
import { Huesped } from 'src/app/models/huesped';
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
  public myForm: FormGroup;
  public validatorMessages: Object;
  public today: any;
  public rooms: String[];
  constructor(private huespedService:HuespedService, private fb:FormBuilder, private router:Router, private toastController: ToastController) { }

  ngOnInit() {
    this.rooms = ["A1", "A2", "B1", "B2", "C1", "C2"];
    this.getDate();
    this.myForm = this.fb.group({
      name:["",Validators.required],
      phone:["",Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')])],
      dateAdmission:["",Validators.required],
      departureDate:["",Validators.required],
      room:["",Validators.required]
    });
    this.validatorMessages = {
      name: [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      phone: [
        { type: 'required', message: "Teléfono obligatoriao" },
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
      ]
    }
  }

  getDate() { const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); console.log(this.today); }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Huesped agregado',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  public newHuesped(data):void{
    //Construir el objeto
    this.huesped = data;
    this.huespedService.newHuesped(this.huesped);
    this.presentToast();
    this.router.navigate(['/view-huesped']);
  }

}
