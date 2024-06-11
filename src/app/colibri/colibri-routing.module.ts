import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColibriPage } from './colibri.page';

const routes: Routes = [
  {
    path: '',
    component: ColibriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColibriPageRoutingModule {}
