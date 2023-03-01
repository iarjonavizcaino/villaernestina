import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LionPage } from './lion.page';

const routes: Routes = [
  {
    path: '',
    component: LionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LionPageRoutingModule {}
