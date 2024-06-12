import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElephantPageRoutingModule } from './elephant-routing.module';

import { ElephantPage } from './elephant.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElephantPageRoutingModule,
    SwiperModule
  ],
  declarations: [ElephantPage]
})
export class ElephantPageModule {}
