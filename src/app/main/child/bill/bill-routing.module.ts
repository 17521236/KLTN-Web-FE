import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill.component';
import { BillDetailComponent } from './child/bill-detail/bill-detail.component';
import { BillListComponent } from './child/bill-list/bill-list.component';
const routes: Routes = [
  {
    path: "", component: BillComponent, children: [
      {
        path: "list", component: BillListComponent
      },
      {
        path: "detail/:id", component: BillDetailComponent
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
export class BillRoutingModule { }
