import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
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

  id = '';
  ERROR_MSG = ERROR_MSG;
  details$;
  types = STATUS_BILL_LIST.map(x => new DropdownItem(x.id, x.name));
  form: FormGroup;
  bill;
  moment = moment;
  pending = false;
  @ViewChild('modal') modal: ActionModalComponent;

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
    });
    this.build();
  }

  build() {
    this.details$ = this.billService.getOne(this.id).pipe(
      tap((res: any) => {
        this.bill = res?.bill;
        this.form.patchValue({
          paidAmount: res?.bill.paidAmount,
          status: res?.bill.status
        });
      })
    );
  }

  close() {
    this.router.navigate([ROUTER_CONST.BILL.LIST]);
  }

  update() {
    if (this.form.valid) {
      this.pending = true;
      const paidAmount = this.form.controls['paidAmount'].value;
      const data = {
        paidAmount,
        status: 'APPROVE',
        lastBalance: Number(this.bill.balanceFowards) + Number(this.bill.amount) - Number(paidAmount)
      };
      this.billService.update(data, this.id).subscribe(_ => {
        this.toast.success('Duy???t th??nh c??ng chi ph??');
        this.modal.close();
        this.build();
      });
    }
  }
  showModal(tpl) {
    this.modal.createComponentModal(tpl);
  }
  gotoResidentDetail(el) {
    this.router.navigate([ROUTER_CONST.RESIDENT.DETAIL(el._id)]);
  }
}
