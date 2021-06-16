import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { RESIDENT_TYPE_LIST, VEHICLE_STATUS_LIST, VEHICLE_TYPE } from 'src/app/core/system.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { ResidentService } from '../../../resident/service/resident.service';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  // add
  showRightMenu = false;
  @ViewChild('modal') modal: ActionModalComponent;

  // init table 
  tableHelper: TableHelper = new TableHelper();
  result$: Observable<any> = this.tableHelper.query$.pipe(
    switchMap((x: TableHelper) => {
      return this.vehicleService.getVehicle(
        x.paginator.getStart(),
        x.paginator.pageSize,
        x.filterForm.value['residentId'],
        x.filterForm.value['licensePlate'],
        x.filterForm.value['type'],
        x.filterForm.value['status']
      );
    })
  )

  // filter
  resident$ = this.residentService.getResident(0, 999);
  residentDD$ = this.resident$.pipe(map((x: any) => {
    let tmp = x.items.map(item => new DropdownItem(item._id, item.name));
    tmp.unshift(new DropdownItem('', 'All'));
    return tmp;
  }));
  residentP$ = this.resident$.pipe(map((x:any)=>x.items));
  VEHICLE_STATUS = [new DropdownItem('', 'All'), ...VEHICLE_STATUS_LIST].map(x => new DropdownItem(x.id, x.text));
  typeList = [{ id: '', name: 'All' }, ...VEHICLE_TYPE].map(x => new DropdownItem(x.id, x.name));

  constructor(
    private router: Router,
    private residentService: ResidentService,
    private vehicleService: VehicleService,
    private fb: FormBuilder
  ) {
    this.tableHelper.filterForm = this.fb.group({
      residentId: "",
      licensePlate: "",
      type: "",
      status: "",
    });
  }
  ngOnInit(): void {
  }
  viewDetail(vehicle) {
    console.log(vehicle)
    this.router.navigate([ROUTER_CONST.VEHICLE.DETAIL(vehicle._id)]);
  }
  showModal(tpl) {
    this.modal.createComponentModal(tpl, {}, false, '')
  }
}
