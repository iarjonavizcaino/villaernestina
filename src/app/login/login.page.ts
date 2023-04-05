import { Room } from './../models/huesped';
import { Huesped } from 'src/app/models/huesped';
import { HuespedService } from '../services/huesped.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public token: string;
  public myForm: FormGroup;
  public huesped: Huesped;
  private _storage: Storage | null = null;
  public tokenstorage: string;
  public roomname: string;
  public roomcode: string;
  @ViewChild('input') myInput;
  isContentLoaded: boolean = false;

  constructor(private loadingCtrl: LoadingController, private route: ActivatedRoute, private fb: FormBuilder, private toastController: ToastController, private router: Router, private huespedService: HuespedService, private storage: Storage) {
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles',
    });
    loading.present();
  }

  async ngOnInit() {
    this.showLoading();
    this.myForm = this.fb.group({
      token: ""
    });
    this._storage = await this.storage.create();
    await this.verifyToken();
  }

  ionViewDidEnter(){
      this.isContentLoaded = true;
  }

  async verifyToken() {
    this.route.queryParams
      .subscribe(async params => {
        // console.log(params); // { brand: "bmw" }
        this.token = params['token'];
        this.tokenstorage = await this.storage.get("token")

        // console.log("Token Param:" + this.token);
        // console.log("Token storage:" + this.tokenstorage);
        if (this.token && this.token != 'undefined') {
          if (this.token != this.tokenstorage) {
            await this._storage?.set("token", this.token);
            this.tokenstorage = this.token;
          }
          setTimeout(async () => {
            this.huesped = await this.huespedService.getHuespedByToken(this.token)

            if (this.huesped) {
              //this.presentToast('bottom', 'Ingreso correcto');
              let room: Room;
              this.huespedService.setToken(this.token);
              room = await this.huespedService.getRoom(this.huesped.room);
              this.roomname = room.name;
              this.roomcode = room.code;

              await this.setStorageData();
              await this.getStorageData();
              console.log(this._storage);

              //this._storage = await this.storage.create();
              this.goToTab1(this.token);
            } else {
              await this._storage.clear();
              this.router.navigate(['']);
            }
          }, 2000);

        } else {
          if (this.tokenstorage && this.tokenstorage != 'undefined') {
            this.token = this.tokenstorage;
          }
          setTimeout(async () => {
            this.huesped = await this.huespedService.getHuespedByToken(this.token)

            if (this.huesped) {
              //this.presentToast('bottom', 'Ingreso correcto');
              let room: Room;
              this.huespedService.setToken(this.token);
              room = await this.huespedService.getRoom(this.huesped.room);
              this.roomname = room.name;
              this.roomcode = room.code;

              await this.setStorageData();
              await this.getStorageData();
              console.log(this._storage);

              //this._storage = await this.storage.create();
              this.goToTab1(this.token);
            } else {
              await this._storage.clear();
              this.router.navigate(['']);
            }
          }, 2000);
        }
        //this.presentToast('bottom', 'Acceso Incorrecto');
        // console.log(token); // bmw
      }
      );
  }

  async setStorageData() {
    await this._storage?.set("name", this.huesped.name);
    await this._storage?.set("roomname", this.roomname);
    await this._storage?.set("roomcode", this.roomcode);
    await this._storage?.set("admisiondate", this.huesped.dateAdmission);
    await this._storage?.set("departuredate", this.huesped.departureDate);
    await this._storage?.set("price", this.huesped.price);
    await this._storage?.set("advance", this.huesped.advance);
    await this._storage?.set("platform", this.huesped.platform);
  }

  async getStorageData() {
    console.log(await this._storage?.get("name"));
    console.log(await this._storage?.get("roomname"));
    console.log(await this._storage?.get("roomcode"));
    console.log(await this._storage?.get("admisiondate"));
    console.log(await this._storage?.get("departuredate"));
    console.log(await this._storage?.get("price"));
    console.log(await this._storage?.get("advance"));
    console.log(await this._storage?.get("platform"));
  }

  public login(data): void {
    this.token = data.token;
    if (this.token == "admin12345") {
      this.presentToast('bottom', 'Acceso Correcto');
      this.router.navigate(['/view-huesped']);
    } else if (this.huespedService.getHuespedByToken(this.token)) {
      this.presentToast('bottom', 'Ingreso correcto');
      this.huespedService.setToken(this.token);
      this.goToTab1(this.token);
    } else {
      this.presentToast('bottom', 'Acceso Incorrecto');
    }
  }

  public goToTab1(token: string): void {
    this.router.navigate(['/tabs/tab1']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000,
      position: position
    });
    await toast.present();
  }

}
