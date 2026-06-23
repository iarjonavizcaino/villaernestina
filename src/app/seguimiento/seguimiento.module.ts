import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeguimientoPageRoutingModule } from './seguimiento-routing.module';
import { SeguimientoPage } from './seguimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SeguimientoPageRoutingModule
  ],
  declarations: [SeguimientoPage]
})
export class SeguimientoPageModule {}
