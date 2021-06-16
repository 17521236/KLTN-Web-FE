import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { RESIDENT_TYPE_LIST, VEHICLE_STATUS_LIST, VEHICLE_TYPE } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { AppSnackbarService } from 'src/app/shared/service/snackbar.service';
import { ResidentService } from '../../../resident/service/resident.service';
import { VehicleReq } from '../../model/vehicle.model';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  ERROR_MSG = ERROR_MSG;
  resident$ = this.residentService.getResident(0, 999).pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
  statusList = VEHICLE_STATUS_LIST.map(x => new DropdownItem(x.id, x.text));
  typeList = VEHICLE_TYPE.map(x => new DropdownItem(x.id, x.name));

  // form
  form: FormGroup;
  id$ = this.route.params.pipe(map(params => params.id));
  vehicle$ = this.id$.pipe(
    switchMap(id => this.vehicleService.getVehicleById(id)),
    switchMap((vehicle: any) => {
      this.buildForm(vehicle);
      return of(vehicle);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackbarService: AppSnackbarService,
    private residentService: ResidentService,
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit(): void {
  }

  buildForm(obj) {
    console.log(obj)
    this.form = this.fb.group({
      residentId: [obj.residentId, Validators.required],
      licensePlate: [obj.licensePlate, Validators.required],
      price: [obj.price, Validators.required],
      status: [obj.status, Validators.required],
      type: [obj.type, Validators.required],
    });
  }
  update() {
    if (this.form.valid) {
      this.vehicleService.updateVehicle(this.route.snapshot.params.id, this.form.value).subscribe(res => {
        this.form.markAsPristine();
        this.snackbarService.success(SUCCESS_MSG.edit);
      })
    }
  }
  close() {
    window.history.back();
  }
}
