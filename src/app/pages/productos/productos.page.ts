/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { StorageserviceService } from 'src/app/services/storageservice.service';
import { ModalFormPage } from '../modal-form/modal-form.page';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Input() task;

  newTaskObj = {};
  //img;
  nombre;
  precio;
  descripcion;

  constructor(
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public dataService: StorageserviceService) { }


  ngOnInit() {
    //this.img = this.task.value.img;
    this.nombre = this.task.value.nombre;
    this.precio = this.task.value.precio;
    this.descripcion = this.task.value.descripcion;
  }
  async dismis() {
    await this.modalCtrl.dismiss();
  }

  async update() {
    this.newTaskObj = ({ nombre: this.nombre, precio: this.precio, descripcion: this.descripcion });
    const uid = this.task.key;
    await this.dataService.updateTask(uid, this.newTaskObj);
    this.dismis();
  }

}
