import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './child/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './child/vehicle-detail/vehicle-detail.component';
import { AddVehicleComponent } from './component/add-vehicle/add-vehicle.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [VehicleComponent, VehicleListComponent, VehicleDetailComponent, AddVehicleComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    SharedModule
  ]
})
export class VehicleModule { }
