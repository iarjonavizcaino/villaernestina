import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoHuespedPageRoutingModule } from './info-huesped-routing.module';

import { InfoHuespedPage } from './info-huesped.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoHuespedPageRoutingModule
  ],
  declarations: [InfoHuespedPage]
})
export class InfoHuespedPageModule {}
