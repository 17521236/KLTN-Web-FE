import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { APARTMENT_TYPE_LIST } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { AppSnackbarService } from 'src/app/shared/service/snackbar.service';
import { BlockService } from '../../../block/service/block.service';
import { ApartmentService } from '../../service/apartment.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {

  ERROR_MSG = ERROR_MSG;
  id$ = this.route.params.pipe(map(params => params.id));
  apartment$ = this.id$.pipe(
    switchMap(id => this.apartmentService.getApartmentById(id)),
    map((res: any) => {
      this.buildFormDetail(res);
      return res;
    })
  );
  blocks$ = this.blockService.getBlocks('',0,999).pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
  options = APARTMENT_TYPE_LIST.map(x => new DropdownItem(x.id, x.text));
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private snackbarService: AppSnackbarService,
    private blockService: BlockService
  ) { }

  ngOnInit(): void {
  }

  buildFormDetail(apt) {

    this.form = this.fb.group({
      name: [apt.name, Validators.required],
      blockId: [apt.blockId, Validators.required],
      type: [apt.type, Validators.required],
      area: [apt.area, [Validators.required, Validators.pattern(PATTERN.ONLY_NUMBER)]],
      description: apt.description,
      totalResident: apt.totalResident,
      totalVehicle: apt.totalVehicle
    });
  }
  update() {
    if (this.form.valid) {
      this.apartmentService.updateApartment(this.route.snapshot.params.id, this.form.value).subscribe(res => {
        this.form.markAsPristine();
        this.snackbarService.success(SUCCESS_MSG.edit);
      })
    }
  }
  close() {
    window.history.back();
  }
}
