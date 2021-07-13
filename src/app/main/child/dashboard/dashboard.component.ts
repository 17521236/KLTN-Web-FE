import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { STATUS_BILL_APPROVE, STATUS_BILL_LIST, STATUS_BILL_NOT_APPROVE, STATUS_BILL_PENDING } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  moment = moment;
  detail$ = this.dashboardService.getDashboard().pipe(
    tap((res: any) => {
      this.chartOptions.series = [
        res?.billInfos.approve.length,
        res?.billInfos.pending.length,
        res?.billInfos.not_approve.length
      ];
    })
  );
  chartOptions = {
    series: [0, 0, 0, 1],
    chart: {
      type: "pie"
    },
    labels: [
      STATUS_BILL_LIST.find(x => x.id == STATUS_BILL_APPROVE).name,
      STATUS_BILL_LIST.find(x => x.id == STATUS_BILL_PENDING).name,
      STATUS_BILL_LIST.find(x => x.id == STATUS_BILL_NOT_APPROVE).name,
      'Chưa tạo bill'
    ]
  };

  options: DropdownItem[] = [
    new DropdownItem(0, 'Item 1'),
    new DropdownItem(2, 'Item 2')
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  navBlock() {
    this.router.navigate([ROUTER_CONST.BLOCK.LIST])
  }

  navApt() {
    this.router.navigate([ROUTER_CONST.APARTMENT.LIST])
  }

  navResident() {
    this.router.navigate([ROUTER_CONST.RESIDENT.LIST])
  }

  navVeh() {
    this.router.navigate([ROUTER_CONST.VEHICLE.LIST])
  }

}
