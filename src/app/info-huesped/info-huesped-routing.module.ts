import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoHuespedPage } from './info-huesped.page';

const routes: Routes = [
  {
    path: '',
    component: InfoHuespedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoHuespedPageRoutingModule {}
