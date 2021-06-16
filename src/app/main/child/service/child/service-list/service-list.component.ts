import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { Service } from '../../model/service.model';
import { ServiceService } from '../../sevice/sevice.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  // add
  showRightMenu = false;
  @ViewChild('modal') modal: ActionModalComponent;

  // init table 
  tableHelper: TableHelper = new TableHelper();
  result$: Observable<Service[]> = this.tableHelper.query$.pipe(
    switchMap((table: TableHelper) => {
      return this.sService.getList({}).pipe(
        tap((x: any[]) => this.total = x.length),
        map((res: any[]) => res.filter((i, index) => (index >= table.paginator.getStart()) && (index < table.paginator.getStart() + table.paginator.pageSize)))
      );
    })
  )
  total = 0;

  constructor(private sService: ServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  showModal(tpl) {
    this.modal.createComponentModal(tpl, {}, false, '')
  }

  viewDetail(item) {
    this.router.navigate([ROUTER_CONST.SERVICE.DETAIL(item._id)])
  }

}
