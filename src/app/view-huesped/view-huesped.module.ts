import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewHuespedPageRoutingModule } from './view-huesped-routing.module';

import { ViewHuespedPage } from './view-huesped.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewHuespedPageRoutingModule
  ],
  declarations: [ViewHuespedPage]
})
export class ViewHuespedPageModule {}
