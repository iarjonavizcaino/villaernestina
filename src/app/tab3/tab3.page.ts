import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';
// import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab3Page {

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild("foodmodal") modal: IonModal;
  @ViewChild("legendmodal") modalLegend: IonModal;
  @ViewChild("historymodal") modalHistory: IonModal;
  @ViewChild("lagoonmodal") modalLagoon: IonModal;
  @ViewChild("kayakmodal") modalKayak: IonModal;
  @ViewChild("massagemodal") modalMassage: IonModal;
  @ViewChild("temazcalmodal") modalTemazcal: IonModal;
  @ViewChild("ciclismmodal") modalCiclism: IonModal;
  @ViewChild("boatmodal") modalBoat: IonModal;
  @ViewChild("swimmodal") modalSwim: IonModal;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    loop: true
  };

  animationInProgress = false;

  meals = [
    {
      img: "../../assets/img/Comidas1.jpeg",
      title: 'COMIDA1',
      subtitle: 'Ubicación: A 82 metros de Villa Ernestina',
      map: "https://goo.gl/maps/7ziwhAHGFe5rWtAp8"
    },
    {
      img: "../../assets/img/Comidas2.jpeg",
      title: 'COMIDA2',
      subtitle: 'Ubicación: A 400 metros de Villa Ernestina',
      map: "https://goo.gl/maps/7rSv6RgNgtNkrykb7"
    },
    {
      img: "../../assets/img/Comidas3.jpeg",
      title: 'COMIDA3',
      subtitle: 'Ubicación: A 450 metros de Villa Ernestina',
      map: "https://goo.gl/maps/Jwxj2CUgjRBeyz4w7"
    },
    {
      img: "../../assets/img/Comidas4.jpeg",
      title: 'COMIDA4',
      subtitle: '',
      map: ""
    }
  ]

  constructor() { }

  cancel(type: number) {
    this.animationInProgress = false;
    switch (type) {
      case 1:
        this.modal.dismiss(null, 'cancel');
        break;
      case 2:
        this.modalLegend.dismiss(null, 'cancel');
        break;
      case 3:
        this.modalHistory.dismiss(null, 'cancel');
        break;
      case 4:
        this.modalLagoon.dismiss(null, 'cancel');
        break;
      case 5:
        this.modalKayak.dismiss(null, 'cancel');
        break;
      case 6:
        this.modalMassage.dismiss(null, 'cancel');
        break;
      case 7:
        this.modalTemazcal.dismiss(null, 'cancel');
        break;
      case 8:
        this.modalCiclism.dismiss(null, 'cancel');
        break;
      case 9:
        this.modalBoat.dismiss(null, 'cancel');
        break;
      case 10:
        this.modalSwim.dismiss(null, 'cancel');
        break;
      default:
        break;
    }
  }

  // // ionViewDidEnter() {
  // //   console.log("ionViewDidEnter")
  // //   this.animationInProgress = false;
  // //   this.startAnimation();
  // // }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave")
  //   //this.swiperSlideShow.swiperRef.
  //   this.animationInProgress = false;
  // }

  startAnimation() {
    if (this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiperSlideShow.swiperRef.slideNext(500);
      this.animationInProgress = false;
      this.startAnimation();
    }, 3000);
  }

}
