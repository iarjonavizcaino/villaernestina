import { HuespedService } from './../huesped.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public token:string;
  public myForm:FormGroup;

  constructor(private fb:FormBuilder, private toastController: ToastController, private router:Router, private huespedService:HuespedService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      token: ""
    });
  }

  public login(data):void{
    console.log(data);
    this.token = data.token;
    if(this.token == "admin12345"){
      this.presentToast('bottom','Acceso Correcto');
      this.router.navigate(['/view-huesped']);
    }else if (this.huespedService.getHuespedByToken(this.token)) {
      this.presentToast('bottom','Ingreso correcto');
      this.getHuespedByToken(this.token);
      this.huespedService.setToken(this.token);
    }else{
      this.presentToast('bottom','Acceso Incorrecto');
    }
  }

  public getHuespedByToken(token: string): void{
    this.router.navigate(['/tabs/tab2'],{
      queryParams: {token: token}
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000,
      position: position
    });

    await toast.present();
  }

}
