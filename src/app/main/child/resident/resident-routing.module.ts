import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResidentDetailComponent } from './child/resident-detail/resident-detail.component';
import { ResidentListComponent } from './child/resident-list/resident-list.component';
import { ResidentComponent } from './resident.component';

const routes: Routes = [
  {
    path: "", component: ResidentComponent, children: [
      {
        path: "list", component: ResidentListComponent
      },
      {
        path: "detail/:id", component: ResidentDetailComponent
      },
      {
        path: "", redirectTo: "list", pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentRoutingModule { }
