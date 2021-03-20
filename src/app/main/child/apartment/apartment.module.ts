import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentComponent } from './apartment.component';
import { ApartmentRoutingModule } from './apartment-routing.module';



@NgModule({
  declarations: [ApartmentComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule
  ]
})
export class ApartmentModule { }
