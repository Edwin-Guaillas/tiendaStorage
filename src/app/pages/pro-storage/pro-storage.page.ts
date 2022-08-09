import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { StorageserviceService } from '../../services/storageservice.service';
import { ModalFormPage } from '../modal-form/modal-form.page';
import { ProductosPage } from '../productos/productos.page';



@Component({
  selector: 'app-pro-storage',
  templateUrl: './pro-storage.page.html',
  styleUrls: ['./pro-storage.page.scss'],
})
export class ProStoragePage implements OnInit {
  productos = [];
  constructor(
    public modalCtrl: ModalController,
    public dataService: StorageserviceService,
    public alertController: AlertController) {
    this.getAllTask();
  }

  ngOnInit() {
  }
  async addNewItem() {
    const modal = await this.modalCtrl.create({
      component: ModalFormPage
    });
    modal.onDidDismiss().then(newTask => {
      this.getAllTask();
    });
    return await modal.present();
  }

  getAllTask() {
    this.productos = this.dataService.getAllTask();
  }

  eliminar(key) {
    this.mensaje(key);
  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: ProductosPage,
      componentProps: { task: selectedTask }
    });
    modal.onDidDismiss().then(newTask => {
      this.getAllTask();
    });
    return await modal.present();
  }

  async mensaje(key) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ESPERA!',
      message: '¿Estás seguro de que quieres eliminar la nota?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.dataService.deleteTask(key);
            this.getAllTask();
            this.mensaje2();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async mensaje2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'GENIAL!',
      message: 'Eliminado Correctamente',
      buttons: ['ACEPTAR']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
