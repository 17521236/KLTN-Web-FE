import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PATTERN } from 'src/app/core/pattern';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { STATUS_BILL_LIST } from 'src/app/core/system.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { BillService } from '../../service/bill.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

  id: string = '';
  details$;
  types = STATUS_BILL_LIST.map(x => new DropdownItem(x.id, x.name));
  form: FormGroup;
  bill;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private billService: BillService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      paidAmount: [0, Validators.pattern(PATTERN.ONLY_NUMBER)],
      status: ''
    })
    this.build();
  }

  build() {
    this.details$ = this.billService.getOne(this.id).pipe(
      tap((res: any) => {
        this.bill = res?.bill;
        this.form.patchValue({
          paidAmount: res?.bill.paidAmount,
          status: res?.bill.status
        })
      })
    );
  }

  close() {
    this.router.navigate([ROUTER_CONST.BILL.LIST]);
  }

  moment = moment;
  pending = false;
  update() {
    if (this.form.valid) {
      this.pending = true;
      let paidAmount = this.form.controls['paidAmount'].value;
      let data = {
        paidAmount,
        status: 'APPROVE',
        lastBalance: Number(this.bill.balanceFowards) + Number(this.bill.amount) - Number(paidAmount)
      };
      this.billService.update(data, this.id).subscribe(_ => {
        this.toast.success('Duyệt thành công chi phí');
        this.modal.close();
        this.build();
      })
    }
  }
  @ViewChild('modal') modal: ActionModalComponent
  showModal(tpl) {
    this.modal.createComponentModal(tpl);
  }
}
