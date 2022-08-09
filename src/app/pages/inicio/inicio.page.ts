import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { menu } from 'src/app/interfaces/menu';
import { nov } from 'src/app/interfaces/novedades';
import { DataserviseService } from 'src/app/services/dataservise.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  novedades: Observable<nov[]>;
  menu: Observable<menu[]>;
  constructor(private dat: DataserviseService) { }

  ngOnInit() {
    this.novedades = this.dat.getNoved();
    this.menu = this.dat.getMenu();
  }

}
