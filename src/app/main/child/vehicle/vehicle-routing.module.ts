import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailComponent } from './child/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './child/vehicle-list/vehicle-list.component';
import { VehicleComponent } from './vehicle.component';

const routes: Routes = [
  {
    path: "", component: VehicleComponent, children: [
      {
        path: "list", component:VehicleListComponent
      },
      {
        path: "detail/:id", component:VehicleDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
