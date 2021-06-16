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
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
  providers: [BillListStoreService]
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

  filterForm: FormGroup;

  constructor(private billStore: BillListStoreService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let filter: IFilterBill = {
      start: 0,
      limit: 5,
      status: '',
      apartmentId: '',
      month: null
    }
    this.buildForm();
    this.billStore.onPageChange(filter);
  }

  buildForm() {
    this.filterForm = this.fb.group({
      blockId: null,
      apartmentId: null,
      month: null
    })
  }

  showModal(addTpl) {
    this.modal.createComponentModal(addTpl, {}, false, '')
  }

  onPageChange(evt: PaginatorEvent, status = null, apartmentId = null, month = null) {
    let filter: IFilterBill = {
      start: evt.genStartLimit().start,
      limit: evt.genStartLimit().limit,
      status,
      apartmentId,
      month: month != '01-1970' ? month : null
    }
    console.log(filter, 'filter')
    this.billStore.onPageChange(filter);
  }

  blockSelected(evt) {
    this.billStore.blockSelected(evt);
  }

  @ViewChild('paginator') paginator: PaginatorComponent;
  search() {
    this.onPageChange(
      this.paginator.getCurrentEvent() || new PaginatorEvent(0, 5),
      '',
      this.filterForm.controls['apartmentId'].value,
      moment(new Date(this.filterForm.controls['month'].value).getTime()).format('MM-YYYY')
    )
  }
}
