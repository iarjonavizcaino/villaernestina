import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped, Room } from '../models/huesped';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';
import { IonicSlides, IonModal, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { verify } from 'crypto';


SwiperCore.use([Autoplay, IonicSlides]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab1Page {

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;
  @ViewChild("kayakmodal") modalKayak: IonModal;
  @ViewChild("massagemodal") modalMassage: IonModal;
  @ViewChild("temazcalmodal") modalTemazcal: IonModal;
  @ViewChild("ciclismmodal") modalCiclism: IonModal;
  @ViewChild("boatmodal") modalBoat: IonModal;
  @ViewChild("swimmodal") modalSwim: IonModal;

  private _storage: Storage | null = null;

  public room: Room;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    loop: true
  };
  langs: string[] = [];
  huesped: Huesped;
  public fecha: String;
  animationInProgress = false;
  public roomname: string;
  public roomcode: string;
  public huespedname: string;
  public admisiondate: string;
  public departuredate: string;
  public countrestart: number;
  public price: number;
  public advance: number;
  public platform: string;
  public isContentload = false;

  viewInstructions = 0;

  constructor(private router: Router, private storage: Storage, public translate: TranslateService, public huespedService: HuespedService, private route: ActivatedRoute, private toastController: ToastController) {
    this.countrestart = 0;
  }

  async ngOnInit() {
    this._storage = await this.storage.create();
    this.prepareData();
  }

  async getStorageData() {

    this.huespedname = await this._storage?.get("name");
    if (!this.huespedname || this.huespedname === "undefined") {
      await this._storage.clear();
      this.router.navigate(['']);
    }
    else {
      this.roomname = await this._storage?.get("roomname");
      this.roomcode = await this._storage?.get("roomcode");
      this.admisiondate = await this._storage?.get("admisiondate");
      this.departuredate = await this._storage?.get("departuredate");
      this.price = await this._storage?.get("price");
      this.advance = await this._storage?.get("advance");
      this.platform = await this._storage?.get("platform");
      
    }
  }

  async prepareData() {
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.fecha = now.toISOString().substring(0, 19) + "-07:00";
    await this.getStorageData();
    if (this.fecha >= this.admisiondate) {
      if (this.fecha.substring(0, 11) < this.departuredate.substring(0, 11))
        this.viewInstructions = 1;
      else if (this.fecha.substring(0, 11) === this.departuredate.substring(0, 11))
        this.viewInstructions = 2;
      else
        this.viewInstructions = 3;
    } else {
      this.viewInstructions = -1
    }
    // console.log("Tipo: "+this.viewInstructions);
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
    this.animationInProgress = false;
    this.startAnimation();
    console.log("Diferencia"+(this.price-this.advance));
    this.isContentload = true;
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave")
    this.animationInProgress = false;
  }

  startAnimation() {
    if (this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiperSlideShow.swiperRef.slideNext(500);
      this.animationInProgress = false;
      this.startAnimation();
    }, 2000);
  }

  cancel(type: number) {
    this.animationInProgress = false;
    switch (type) {
      case 1:
        this.modalKayak.dismiss(null, 'cancel');
        break;
      case 2:
        this.modalMassage.dismiss(null, 'cancel');
        break;
      case 3:
        this.modalTemazcal.dismiss(null, 'cancel');
        break;
      case 4:
        this.modalCiclism.dismiss(null, 'cancel');
        break;
      case 5:
        this.modalBoat.dismiss(null, 'cancel');
        break;
      case 6:
        this.modalSwim.dismiss(null, 'cancel');
        break;
      default:
        break;
    }
  }

  async copy(pass: string) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(pass);
        this.presentToast()
      } catch (err) { }
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Copiado',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  async restart() {
    console.log(this.countrestart);
    if (this.countrestart++ >= 4) {
      await this._storage.clear();
      this.router.navigate(['']);
    }
  }

  public viewDetails(bungalow: string) {

    let navigationExtras: NavigationExtras = {
      state: {
        bungalow: bungalow
      }
    }; 

    this.router.navigate(['/lion'], navigationExtras);
  }
}
