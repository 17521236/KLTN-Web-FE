import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResidentComponent } from './resident.component';

const routes: Routes = [
  {
    path: "", component: ResidentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentRoutingModule { }
