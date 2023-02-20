import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { HuespedService } from '../services/huesped.service';
import { Huesped, Room } from '../models/huesped';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, IonicSlides]);

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    loop: true
  };

  animationInProgress = false;
  
  public huespeds:Huesped[];
  public rooms:Room[];
  public token:string;

  constructor(private huespedService:HuespedService, private aRoute:ActivatedRoute) {
    // this.huespeds = [{
    //   name: "",
    //   phone: "",
    //   dateAdmission: "",
    //   departureDate: "",
    //   room: "",
    //   advance: 0,
    //   token: "",
    //   gender: ""
    // }];


    
  }

  ngOnInit() {
    console.log("ionViewDidEnter")
    this.animationInProgress = false;
    //this.startAnimation();

  }



  // public getCodeByRoom(room:String):String{
  //   //return this.huespedService.getCodeByRoom(room);
  //   this.huespedService.getRooms().subscribe(res =>{
  //     this.rooms = res;
  //     //console.log(this.huespeds);
  //   })
  //   return this.getCode(room);
  // }

  // public enFecha(llegada:String, salida:String):Boolean{
  //   let fecha = new Date;
    
  //   return (llegada <= fecha.toISOString() && salida >= fecha.toISOString());
  // }

  // public getCode(room:String):String{
  //   let item : Room;
  //   item = this.rooms.find(
  //     (habitacion)=>{
  //       return habitacion.name==room;
  //     }
  //   );
  //   return item.code;
  // }

  ionViewWillEnter(){
    
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave")
    //this.swiperSlideShow.swiperRef.
    this.animationInProgress = false;
  }

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
