/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageserviceService } from 'src/app/services/storageservice.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.page.html',
  styleUrls: ['./modal-form.page.scss'],
})
export class ModalFormPage implements OnInit {
  newTaskObj = {};
  //img;
  nombre;
  precio;
  descripcion;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public dataService: StorageserviceService,
  ) { }

  ngOnInit() {
  }
  async add() {
    this.newTaskObj = ({ nombre: this.nombre, precio: this.precio, descripcion: this.descripcion });
    // eslint-disable-next-line prefer-const
    let uid = this.nombre + this.precio + this.descripcion;

    if (uid) {
      await this.dataService.addTask(uid, this.newTaskObj);
    } else {
      this.exito();
    }
    this.dismis();
  }

  async dismis() {
    await this.modalController.dismiss(this.newTaskObj);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async Alertas() {
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      subHeader: 'Campos Vacios',
      message: 'Llene todos los campos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  async exito() {
    const alert = await this.alertController.create({
      header: '¡Exito!',
      message: 'Producto guardado exitosamente',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
