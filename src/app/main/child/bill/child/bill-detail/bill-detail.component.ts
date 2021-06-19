import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { STATUS_BILL_LIST } from 'src/app/core/system.config';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private billService: BillService,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      paidAmount: 0,
      status: ''
    })
    this.details$ = this.billService.getOne(this.id).pipe(
      tap((res: any) => {
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
}
