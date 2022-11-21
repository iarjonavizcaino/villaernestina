import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  langs:string[] = [];

  constructor(public translate : TranslateService) {
   // this.langs = this.translateService.getLangs();
  }

  /*changeLang(event){
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }*/

}
