import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { IonicSlides, IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';

import { Router, NavigationExtras } from '@angular/router';

SwiperCore.use([Autoplay, IonicSlides]);


@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuestPage implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    loop: true
  };

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;
  // @ViewChild("lionmodal") lionmodal: IonModal;

  animationInProgress = false;



  constructor(public translate: TranslateService, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
    this.animationInProgress = false;
    this.startAnimation();
  }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave")
  //   this.animationInProgress = false;
  // }

  startAnimation() {
    if (this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiperSlideShow.swiperRef.slideNext(500);
      this.animationInProgress = false;
      this.startAnimation();
    }, 2000);
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
