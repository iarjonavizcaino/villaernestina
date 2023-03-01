import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LionPageRoutingModule } from './lion-routing.module';

import { LionPage } from './lion.page';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LionPageRoutingModule,
    TranslateModule,
    SwiperModule
  ],
  declarations: [LionPage]
})
export class LionPageModule {}
