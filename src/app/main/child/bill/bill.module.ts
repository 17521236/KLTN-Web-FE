import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill.component';
import { BillDetailComponent } from './child/bill-detail/bill-detail.component';
import { BillRoutingModule } from './bill-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BillAddComponent } from './component/bill-add/bill-add.component';
import { BillService } from './service/bill.service';
import { BillListComponent } from './child/bill-list/bill-list.component';
// import { ServiceComponent } from './service/service.component';



@NgModule({
  declarations: [BillComponent, BillListComponent, BillDetailComponent, BillAddComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    SharedModule
  ],
  providers: [BillService]
})
export class BillModule { }
