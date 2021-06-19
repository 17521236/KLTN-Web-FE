import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { PaginatorEvent } from 'src/app/shared/component/paginator/paginator-event.model';
import { PaginatorComponent } from 'src/app/shared/component/paginator/paginator.component';
import { BillService, IFilterBill } from '../../service/bill.service';
import { BillListStoreService } from './bill-list-store.service';
import * as moment from 'moment';
import { STATUS_BILL_LIST } from 'src/app/core/system.config';
import { Router } from '@angular/router';
import { ROUTER_CONST } from 'src/app/core/router.config';
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  @ViewChild('modal') modal: ActionModalComponent;
  records$ = this.billStore.records$;
  total$ = this.billStore.total$;
  loading$ = this.billStore.loading$;
  blocksDD$ = this.billStore.blocks$.pipe(map((res: any) => {
    return [
      new DropdownItem(null, 'All'),
      ...res.items.map((x: any) => new DropdownItem(x._id, x.name))
    ]
  }));
  blocksP$ = this.billStore.blocks$.pipe(map((res: any) => res.items))
  apts$ = this.billStore.apts$.pipe(map((res: any) => {
    return [
      new DropdownItem(null, 'All'),
      ...res.map((x: any) => new DropdownItem(x._id, x.name))
    ]
  }));
  status = [new DropdownItem(null, 'All'), ...STATUS_BILL_LIST.map(x => new DropdownItem(x.id, x.name))];
  filterForm: FormGroup;

  constructor(
    private billStore: BillListStoreService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.billStore.refresh();
  }

  buildForm() {
    this.filterForm = this.fb.group({
      blockId: null,
      apartmentId: null,
      month: null,
      status: null
    })
  }

  showModal(addTpl) {
    this.modal.createComponentModal(addTpl, {}, false, '')
  }

  onPageChange(evt: PaginatorEvent, status = null, apartmentId = null, month = null) {
    this.billStore.onPageChange(evt.genStartLimit().start, evt.genStartLimit().limit, status, apartmentId, month);
  }

  blockSelected(evt) {
    this.billStore.blockSelected(evt);
  }

  @ViewChild('paginator') paginator: PaginatorComponent;
  search() {
    this.onPageChange(
      this.paginator ? this.paginator.getCurrentEvent() : new PaginatorEvent(1, 5),
      this.filterForm.controls['status'].value,
      this.filterForm.controls['apartmentId'].value,
      moment(new Date(this.filterForm.controls['month'].value).getTime()).format('MM-YYYY')
    )
  }
  selectApt(evt) {
    this.search();
  }
  viewDetail(item) {
    console.log(item);
    this.router.navigate([ROUTER_CONST.BILL.DETAIL(item._id)])
  }
}
