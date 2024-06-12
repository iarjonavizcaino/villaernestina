import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElephantPage } from './elephant.page';

const routes: Routes = [
  {
    path: '',
    component: ElephantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElephantPageRoutingModule {}
