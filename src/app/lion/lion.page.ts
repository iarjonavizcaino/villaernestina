import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicSlides, IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';

@Component({
  selector: 'app-lion',
  templateUrl: './lion.page.html',
  styleUrls: ['./lion.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LionPage implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    loop: true
  };

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;
  // @ViewChild("lionmodal") lionmodal: IonModal;

  animationInProgress = false;

  constructor() { }

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

}
