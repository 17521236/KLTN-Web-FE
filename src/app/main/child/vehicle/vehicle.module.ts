import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { VehicleRoutingModule } from './vehicle-routing.module';



@NgModule({
  declarations: [VehicleComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
