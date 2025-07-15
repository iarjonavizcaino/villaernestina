import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-gallery',
  templateUrl: './modal-gallery.component.html',
})
export class ModalGalleryComponent {
  @Input() photos: string[] = [];
  fotoAmpliada: string | null = null;

  constructor(private modalCtrl: ModalController) {}

  verFoto(foto: string) {
    this.fotoAmpliada = foto;
  }

  cerrarFoto() {
    this.fotoAmpliada = null;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
