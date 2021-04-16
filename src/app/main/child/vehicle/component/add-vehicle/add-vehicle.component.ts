import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { VEHICLE_STATUS_LIST } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { AppSnackbarService } from 'src/app/shared/service/snackbar.service';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { ResidentService } from '../../../resident/service/resident.service';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  @Input() tableHelper: TableHelper;
  ERROR_MSG = ERROR_MSG;
  resident$ = this.residentService.getResident(0, 999).pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
  statusList = VEHICLE_STATUS_LIST.map(x => new DropdownItem(x.id, x.text));
  typeList = [{ id: 'Sirius', name: 'Sirius' },
  { id: 'Wave', name: 'Wave' },
  { id: 'Car', name: 'Car' }
  ].map(x => new DropdownItem(x.id, x.name));
  pending = false;

  form: FormGroup = this.fb.group({
    residentId: ["", Validators.required],
    licensePlate: ["", Validators.required],
    price: ["", Validators.required],
    status: ["", Validators.required],
    type: ["", [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private snackbarService: AppSnackbarService,
    private residentService: ResidentService,
    private vehicleService: VehicleService,
    public modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  add() {
    this.pending = true;
    if (this.form.valid) {
      this.pending = false;
      this.vehicleService.addVehicle(this.form.value).subscribe(x => {
        this.modal.closeAll();
        this.tableHelper.next();
        this.snackbarService.success(SUCCESS_MSG.add);
      })
    }
  }
}
