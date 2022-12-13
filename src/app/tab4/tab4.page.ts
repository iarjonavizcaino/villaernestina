import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType} from '@capacitor/camera';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  picture: string;
  constructor() { }

  ngOnInit() {
  }

  async takePicture(){
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing : false,
        resultType: CameraResultType.DataUrl
      });

      this.picture = image.dataUrl;
  }

}
