import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill.component';
import { BillListComponent } from './child/bill-list/bill-list.component';
import { BillDetailComponent } from './child/bill-detail/bill-detail.component';
import { BillRoutingModule } from './bill-routing.module';
// import { ServiceComponent } from './service/service.component';



@NgModule({
  declarations: [BillComponent, BillListComponent, BillDetailComponent],
  imports: [
    CommonModule,
    BillRoutingModule
  ]
})
export class BillModule { }
