import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentComponent } from './apartment.component';
import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentListComponent } from './child/apartment-list/apartment-list.component';
import { ApartmentDetailComponent } from './child/apartment-detail/apartment-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddApartmentComponent } from './component/add-apartment/add-apartment.component';



@NgModule({
  declarations: [ApartmentComponent, ApartmentListComponent, ApartmentDetailComponent,AddApartmentComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    SharedModule
  ]
})
export class ApartmentModule { }
