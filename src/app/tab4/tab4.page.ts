import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {Camera, CameraResultType} from '@capacitor/camera';
import { FirestorageService } from '../services/firestorage.service';
import { HuespedService } from '../huesped.service';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  picture: string;
  token:string;
  huesped:Huesped;
  selectedImage: any;

  constructor(private firestorageService:FirestorageService,private huespedService:HuespedService) { 
  }

  ngOnInit() {

    this.huesped = {
      name: '',
      phone: '',
      dateAdmission: '',
      departureDate: '',
      room: '',
      advance: 0,
      photo: "",
      token: '',
    }
    this.token = this.huespedService.getToken();
    console.log(this.token);
    
    this.putPhoto();
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
  }

  async takePicture(){
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing : false,
        resultType: CameraResultType.DataUrl
      });

      this.selectedImage = image;
      if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
  }

  async uploadImage(){
    const path = 'Huesped';
    const name = this.token + ".jpeg";
    const file = "" + new Date().getTime() + '.jpeg';
    const res = await this.firestorageService.uploadImage(file,path,name,this.selectedImage);
    if(this.huespedService.getHuespedByToken(this.token)){
      this.huespedService.updateHuesped(this.token,res);
    }else{
      console.log('Este es el token: '+this.token)
    }
    console.log('recibí res de la promesa', res);
  }

  public putPhoto():void{
    this.huesped = this.huespedService.getHuespedByToken(this.token);

    if(this.huesped.photo != ''){
      this.picture = this.huesped.photo;
      console.log(this.picture);
    }
  }


}
