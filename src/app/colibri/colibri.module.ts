import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColibriPageRoutingModule } from './colibri-routing.module';

import { ColibriPage } from './colibri.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColibriPageRoutingModule,
    SwiperModule
  ],
  declarations: [ColibriPage]
})
export class ColibriPageModule {}
