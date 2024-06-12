import { Component } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';
//import { register } from 'swiper/angular/';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
 /* constructor(private translateService:TranslateService) {
    this.translateService.setDefaultLang('Español');
    this.translateService.addLangs(['English','Español','Frances']);
  }*/

  constructor(public translate: TranslateService){
    translate.addLangs(['Español','Frances','Ingles']);
    translate.setDefaultLang('Español');
    translate.use('Español');
  }

}
