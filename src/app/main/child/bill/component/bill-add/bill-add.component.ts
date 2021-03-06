import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SnackbarService } from 'ngx-snackbar';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { STATUS_BILL_NOT_APPROVE } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { ToastrService } from 'ngx-toastr';
import { IAddBillReq } from '../../service/bill.service';
import { BillAddStoreService, IApartment, IBlock, ICost } from './bill-add-store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.scss'],
  providers: [BillAddStoreService]
})
export class BillAddComponent implements OnInit, OnDestroy {
  moment = moment;
  @Output() success = new EventEmitter<any>();
  form: FormGroup;
  ERROR_MSG = ERROR_MSG;
  pending = false;
  private _sub$ = new Subject();
  totalPrice = 0;
  selecting = false;
  @Input() aptSelect;

  constructor(
    private fb: FormBuilder,
    private billAddStore: BillAddStoreService,
    public modal: NzModalService,
    private toast: ToastrService
  ) {
  }

  block$ = this.billAddStore.block$.pipe(
    tap(_ => this.selecting = false),
    map((res: IBlock[]) => res.map(x => new DropdownItem(x._id, x.name)))
  );
  apt$ = this.billAddStore.apts$.pipe(
    tap(_ => this.selecting = false),
    map((res: IApartment[]) => res.map(x => new DropdownItem(x._id, x.name)))
  );
  aptSelected$ = this.billAddStore.aptSelected$.pipe(
    tap(_ => {
      this.selecting = false;
    })
  );
  area$ = this.billAddStore.aptSelected$.pipe(map((res: IApartment) => Number(res.area)));
  cost$: Observable<ICost> = this.billAddStore.cost$.pipe(
    tap((cost: ICost) => {
      this.form.patchValue({
        internet: cost.INTERNET.quantity,
        service: cost.SERVICE.quantity,
        parking_car: cost.PARKING_CAR.quantity,
        parking_motobike: cost.PARKING_MOTORBIKE.quantity,
        parking_bycircle: cost.PARKING_BYCIRCLE.quantity
      });
    })
  );

  ngOnInit(): void {
    this.form = this.fb.group({
      blockId: '',
      aptId: '',
      electronic: [null, Validators.pattern(PATTERN.ONLY_NUMBER)],
      water: [null, Validators.pattern(PATTERN.ONLY_NUMBER)],
      internet: '',
      service: '',
      parking_bycircle: '',
      parking_car: '',
      parking_motobike: '',
      orther: [null, Validators.pattern(PATTERN.ONLY_NUMBER)]
    });
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this._sub$)
    ).subscribe((value: any) => {
      this.totalPrice = this.calc(value);
    });
  }

  calc(value) {
    let total = 0;
    const cost = this.billAddStore.state.cost;
    if (value['electronic']) {
      total += Number(value['electronic']) * Number(cost.ELECTRONIC.cost);
    }
    if (value['water']) {
      total += Number(value['water']) * Number(cost.WATER.cost);
    }
    if (value['internet']) {
      total += Number(cost.INTERNET.quantity) * Number(cost.INTERNET.cost);
    }
    if (value['service']) {
      total += Number(cost.SERVICE.quantity) * Number(cost.SERVICE.cost);
    }
    if (value['parking_bycircle']) {
      total += Number(cost.PARKING_BYCIRCLE.quantity) * Number(cost.PARKING_BYCIRCLE.cost);
    }
    if (value['parking_motobike']) {
      total += Number(cost.PARKING_MOTORBIKE.quantity) * Number(cost.PARKING_MOTORBIKE.cost);
    }
    if (value['parking_car']) {
      total += Number(cost.PARKING_CAR.quantity) * Number(cost.PARKING_CAR.cost);
    }
    if (value['orther']) {
      total += Number(value['orther']) * Number(cost.ORTHER.cost);
    }
    return total;
  }

  submit() {
    if (this.form.valid) {
      this.pending = true;
      const dataReq = this.formatData(this.form.value);
      this.billAddStore.add(dataReq).subscribe(_ => {
        this.success.emit('');
        this.toast.success('Added successfully');
        setTimeout(() => this.modal.closeAll(), 0);
        this.pending = false;
      }, _ => {
        this.pending = false;
        this.billAddStore.selectBlock('');
        // setTimeout(() => this.modal.closeAll(), 0);
      });
    }
  }

  formatData(val): IAddBillReq {
    const { blockId, aptId, ...rest } = val;
    const dataReq = {
      apartmentId: val.aptId,
      pmId: null,
      date: new Date().getTime(),
      status: STATUS_BILL_NOT_APPROVE,
      amount: Number((this.totalPrice * 1.1).toFixed(0)),
      details: rest
    };
    return dataReq;
  }

  selectBlock(evt) {
    this.form.controls['aptId'].setValue('');
    this.billAddStore.selectBlock(evt);
    this.selecting = true;
  }

  selectApt(id) {
    if (!id) {
      return;
    }
    this.billAddStore.selectApt(id);
    this.selecting = true;
  }

  save() {
  }

  ngOnDestroy(): void {
    this._sub$.next();
  }
}
