import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { PaginatorEvent } from 'src/app/shared/component/paginator/paginator-event.model';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  tableHelper: TableHelper = new TableHelper();
  result$: Observable<any[]> = this.tableHelper.query$.pipe(
    switchMap((table: TableHelper) => {
      return this.employeeService.getLists().pipe(
        tap((x: any[]) => this.total = x.length),
        map((res: any[]) => res.filter((i, index) => (index >= table.paginator.getStart()) && (index < table.paginator.getStart() + table.paginator.pageSize)))
      );
    })
  )
  total = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }
  @ViewChild('modal') modal: ActionModalComponent;
  showModal(tpl) {
    this.modal.createComponentModal(tpl)
  }

  viewDetail(employee){
    this.router.navigate([ROUTER_CONST.EMPLOYEE.DETAIL(employee._id)])
  }
  getLists(){
    this.tableHelper.next();
  }
}
