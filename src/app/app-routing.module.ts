import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'new-huesped',
    loadChildren: () => import('./new-huesped/new-huesped.module').then( m => m.NewHuespedPageModule)
  },
  {
    path: 'view-huesped',
    loadChildren: () => import('./view-huesped/view-huesped.module').then( m => m.ViewHuespedPageModule)
  },
  {
    path: 'info-huesped',
    loadChildren: () => import('./info-huesped/info-huesped.module').then( m => m.InfoHuespedPageModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.module').then( m => m.GuestPageModule)
  },
  {
    path: 'lion',
    loadChildren: () => import('./lion/lion.module').then( m => m.LionPageModule)
  },
  /*{
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  }*/


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
