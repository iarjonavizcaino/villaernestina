import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LionPageRoutingModule } from './lion-routing.module';

import { LionPage } from './lion.page';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule} from '@ngx-translate/core';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LionPageRoutingModule,
    TranslateModule,
    NgxIonicImageViewerModule,
    SwiperModule
  ],
  declarations: [LionPage]
})
export class LionPageModule {}
