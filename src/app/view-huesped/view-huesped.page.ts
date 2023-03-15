import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-view-huesped',
  templateUrl: './view-huesped.page.html',
  styleUrls: ['./view-huesped.page.scss'],
})
export class ViewHuespedPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  public myForm: FormGroup;
  public message: string;
  public huespeds: Huesped[];
  public huesped: Huesped;
  public huespedsFilter: Huesped[];

  constructor(private huespedService: HuespedService, private alertController: AlertController, private router: Router, private fb: FormBuilder) {
    this.message = 'Gracias por tu reservación, para ver más detalles ingresa a https://villaernestina-52a85.web.app/login?token=';
    this.huespedService.getHuespeds().subscribe(res => {
      this.huespeds = res;
      // this.huespedsFilter = this.huespeds;
      let now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      let fecha = now.toISOString().substring(0, 19) + "-00:00";
      this.huespedsFilter = this.huespeds.filter(
        (obj) => {
          return obj.dateAdmission >= fecha;
        }
      );
      this.huespedsFilter.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      );
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      filter: ["dateAdmission"]
    });
    this.myForm.get('filter').valueChanges.subscribe(selectedValue => {
      switch (selectedValue) {
        case 'all': this.all(); break;
        case 'dateAdmission': this.filterByDateAdmission(); break;
        case 'lion': this.filterByLionRoom(); break;
        case 'elephant': this.filterByElephantRoom(); break;
      }
    });
  }

  async removeHuesped(id: string) {
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
            this.huespedService.removeHuesped(id);
            this.handlerMessage = 'Eliminado';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  public getMonthName(dateS: string) {
    let month = dateS.substring(5, 7);
    //console.log(month);
    switch (month) {
      case '01': return 'Enero';
      case '02': return 'Febrero';
      case '03': return 'Marzo';
      case '04': return 'Abril';
      case '05': return 'Mayo';
      case '06': return 'Junio';
      case '07': return 'Julio';
      case '08': return 'Agosto';
      case '09': return 'Septiembre';
      case '10': return 'Octubre';
      case '11': return 'Noviembre';
      case '12': return 'Diciembre';
    }
    return month;
  }

  public newHuesped(): void {
    this.router.navigate(['/new-huesped']);
  }

  public filterByAll(): void {
    this.huespedService.getHuespeds().subscribe(res => {
      this.huespeds = res;
      this.huespedsFilter = this.huespeds;
      this.huespedsFilter.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      )
    })
  }

  filter() {
    this.myForm.get('filter').valueChanges.subscribe(selectedValue => {
      switch (selectedValue) {
        case 'dateAdmission': this.filterByDateAdmission(); break;
        case 'process': this.filterByProcess(); break;
        case 'all': this.filterByAll(); break;
        case 'lion': this.filterByLionRoom(); break;
        case 'elephant': this.filterByElephantRoom(); break;
      }
    });
  }

  public all(): void {
    this.huespedsFilter = this.huespeds;
  }

  public filterByProcess(): void {
    let now = new Date();
    console.log(now);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    console.log(now.toISOString());
    let fecha = now.toISOString().substring(0, 19) + "-00:00";
    console.log(fecha);
    this.huespedsFilter = this.huespeds.filter(
      (obj) => {
        return obj.dateAdmission <= fecha && obj.departureDate>=fecha;
      }
    );
  }

  public filterByDateAdmission(): void {
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let fecha = now.toISOString().substring(0, 19) + "-00:00";
    this.huespedsFilter = this.huespeds.filter(
      (obj) => {
        return obj.dateAdmission >= fecha;
      }
    );
  }

  public filterByLionRoom(): void {
    this.huespedsFilter = this.huespeds.filter(
      (obj) => {
        return obj.room === "León";
      }
    );

  }

  public filterByElephantRoom(): void {
    this.huespedsFilter = this.huespeds.filter(
      (obj) => {
        return obj.room === "Elefante";
      }
    );

  }

  search(event) {
    const query = event.target.value.toLowerCase();
    //console.log(query)
    if (!query || query === "undefined" || query === "")
      this.all();
    else {
      //console.log("Intentando filtrar...");
      this.huespedsFilter = this.huespeds.filter(
        d => { return d.name.split(" ")[0].toLowerCase().includes(query.toLowerCase()) }
      );
    }
  }

}
