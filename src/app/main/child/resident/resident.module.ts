import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentComponent } from './resident.component';
import { ResidentRoutingModule } from './resident-routing.module';



@NgModule({
  declarations: [ResidentComponent],
  imports: [
    CommonModule,
    ResidentRoutingModule
  ]
})
export class ResidentModule { }
