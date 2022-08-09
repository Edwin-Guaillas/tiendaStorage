import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProStoragePage } from './pro-storage.page';

const routes: Routes = [
  {
    path: '',
    component: ProStoragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProStoragePageRoutingModule {}
