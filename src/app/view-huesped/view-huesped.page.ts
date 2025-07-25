import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
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
  public viewPrices = false;

  constructor(private huespedService: HuespedService, private alertController: AlertController, private router: Router, private fb: FormBuilder, private toastController: ToastController) {
    this.message = 'Gracias por tu reservación, para ver más detalles ingresa a https://villaernestina-52a85.web.app/login?token=';
    this.huespedService.filterByToday().subscribe(res => {
      this.huespeds = res;

      this.huespeds.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      );
      let now = new Date();
      this.huespedsFilter = this.huespeds;
      this.myForm.get('filter').setValue('today');
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      filter: ["dateAdmission"]
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
            this.handlerMessage = 'Eliminación cancelada';
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
      this.huespeds.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      )
      this.huespedsFilter = this.huespeds;
    })
  }

  filter() {
    this.myForm.get('filter').valueChanges.subscribe(selectedValue => {
      switch (selectedValue) {
        case 'dateAdmission': this.filterByDateAdmission(); break;
        case 'today': this.filterByToday(); break;
        case 'process': this.filterByProcess(); break;
        case 'checkout': this.filterByCheckout(); break;
        case 'all': this.filterByAll(); break;
        case 'lion': this.filterByLionRoom(); break;
        case 'elephant': this.filterByElephantRoom(); break;
      }
    });
  }

  public all(): void {
    this.huespedsFilter = this.huespeds;
  }

  public filterByToday(): void {
    this.huespedService.filterByToday().subscribe(res => {
      this.huespeds = res;

      this.huespeds.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      );
      this.huespedsFilter = this.huespeds;
    });
  }
  public filterByCheckout(): void {
    this.huespedService.filterByCheckout().subscribe(res => {
      this.huespeds = res;
      this.huespeds.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      );
      this.huespedsFilter = this.huespeds;
    });
  }

  public filterByProcess(): void {
    this.huespedService.filterByProcess().subscribe(res => {
      this.huespeds = res;

      this.huespeds.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      );

      let now = new Date();

      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      let fecha = now.toISOString().substring(0, 19) + "-00:00";
      this.huespedsFilter = this.huespeds.filter(
        (obj) => {
          return obj.dateAdmission <= fecha;
        }
      );

      this.huespeds = this.huespedsFilter;
      //console.log("Universo");
      //console.log(this.huespeds);
    });
  }


  public filterByDateAdmission(): void {

    this.huespedService.filterByDateAdmission().subscribe(res => {
      this.huespeds = res;
      this.huespeds.sort(
        (a, b) => {
          return a.dateAdmission.localeCompare(b.dateAdmission);
        }
      );
      this.huespedsFilter = this.huespeds;
    });
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

  async search(event) {
    const query = event.target.value.toLowerCase();

    this.huespedsFilter = this.huespeds.filter(
      d => { return d.name.split(" ")[0].toLowerCase().includes(query.toLowerCase()) }
    );

  }

  async pay(huesped: Huesped) {
    const alert = await this.alertController.create({
      header: '¿Desea registrar el pago?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Eliminación cancelada';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.huespedService.updatePay(huesped);
            this.handlerMessage = 'Actualizado';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  public deleteSpaces(cad: string) {
    // console.log("Cadena "+cad);
    // console.log("Cadena sin espacios"+cad.replace(/ /g,""));
    return cad.replace(/ /g, "");
  }

  public diffInDays(inicio, fin) {
    const start = new Date(inicio);
    const end = new Date(fin);
    const diffDays = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / (1000 * 60 * 60 * 24));
    const label = Math.abs(diffDays) === 1 ? 'noche' : 'noches';
    return `${diffDays} ${label}`;
  }

  public huespedQty(people: number, children: number) {
    var childrenstring = "";
    if (people === undefined || people === 0) {
      return "";
    }
    if (children === undefined || children === 0) {
      childrenstring = "";
    } else {
      childrenstring = children === 1 ? ` ${children} menor ·` : ` ${children} menores ·`;
    }
    const label = people === 1 ? 'persona' : 'personas';
    return `${people} ${label} · ${childrenstring}`;
  }

  public petsQty(pets: number) {
    if (pets === undefined || pets === 0) {
      return "";
    }
    const label = pets === 1 ? 'mascota' : 'mascotas';
    return ` ${pets} ${label}`;
  }

  public getCel(phone: string) {
    console.log(phone);
    //console.log(this.huespedsFilter);
    return phone.replace(/^\+?(\d{2})(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3 $4');
  }

  public async copyTextToClipboard(text: string) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        this.presentToast(text);
      } catch (err) { }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: 'Copiado ' + message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }
}



