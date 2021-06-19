import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeService } from './employee.service';


@NgModule({
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeDetailComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
