import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../huesped.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-view-huesped',
  templateUrl: './view-huesped.page.html',
  styleUrls: ['./view-huesped.page.scss'],
})
export class ViewHuespedPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  public huespeds: Huesped[];
  public huesped: Huesped;

  constructor(private huespedService: HuespedService,private alertController: AlertController,private router: Router) {
    this.huespeds = huespedService.getHuespeds();
   }

  ngOnInit() {
  }

  async removeHuesped(pos:number) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Eliminación canceleda';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.huespedService.removeHuesped(pos);
            this.huespeds=this.huespedService.getHuespeds();
            this.handlerMessage = 'Eliminado';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  public newHuesped():void{
    this.router.navigate(['/new-huesped']);
  }

  public getHuespedByToken(tkn:string): void{
    this.router.navigate(['/info-huesped'],{
      queryParams: {token:tkn}
    });
  }

}
