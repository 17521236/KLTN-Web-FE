import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
        path: "list", component: EmployeeListComponent
      },
      {
        path: "detail/:id", component: EmployeeDetailComponent
      },
      {
        path: "", redirectTo: "list", pathMatch: "full"
      }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
