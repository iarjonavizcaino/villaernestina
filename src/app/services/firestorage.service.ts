import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  putblob: any;
  private image:string = '';

  constructor(private angularFireStorage:AngularFireStorage) { }


  public getImage(token:string) {
    this.image = '';
    //const pre = `images/guests/${this.guest.getCurrentUser().token}/photos/`
    const ref = this.angularFireStorage.ref('Huesped/'+token);
    let myurlsubscription = ref.listAll().subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.angularFireStorage.ref('Huesped/'+token + data.items[i].name);
        let url = newref.getDownloadURL().subscribe((data) => {
          this.image = data;
        });
      }
    });
    return this.image;
  }

  async uploadImage(file:any,path:string,name:string, photo:Photo): Promise<any>{
    const base64Data = await this.readAsBase64(photo);
    const savedFile = await Filesystem.writeFile({
      path: name,
      data: base64Data,
      directory: Directory.Data
    });
    return new Promise( resolve => {
      const filePath = path+'/'+name;
      const ref = this.angularFireStorage.ref(filePath);
      ref.put(this.putblob).then((res) =>{
        resolve(res);
      });
    });
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    this.putblob = blob
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
