import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { BillService, IFilterBill } from '../../service/bill.service';
import * as moment from 'moment';
import { STATUS_BILL_LIST } from 'src/app/core/system.config';
import { Router } from '@angular/router';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { Observable } from 'rxjs';
import { BlockService } from '../../../block/service/block.service';
import { ApartmentService } from '../../../apartment/service/apartment.service';
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  @ViewChild('modal') modal: ActionModalComponent;
  tableHelper: TableHelper = new TableHelper();
  result$: Observable<any> = this.tableHelper.query$.pipe(
    switchMap((tb: TableHelper) => {
      let filter: IFilterBill = {
        start: tb.paginator.getStart(),
        limit: tb.paginator.getLimit(),
        status: tb.filterForm.value['status'],
        apartmentId: tb.filterForm.value['apartmentId'],
        month: moment(new Date(tb.filterForm.controls['month'].value).getTime()).format('MM-YYYY')
      }
      return this.billService.getList(filter);
    })
  )
  status = [new DropdownItem(null, 'All'), ...STATUS_BILL_LIST.map(x => new DropdownItem(x.id, x.name))];
  blocks$ = this.blockService.getBlocks('', 0, 999).pipe(map((x: any) => x.items));
  blocksDD$ = this.blocks$.pipe(map(x => [new DropdownItem(null, 'All'), ...x.map(i => new DropdownItem(i._id, i.name))]));

  apts$ = this.aptService.getApartment(0, 999).pipe(map((res: any) => res.items));
  aptsDD$;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billService: BillService,
    private blockService: BlockService,
    private aptService: ApartmentService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.tableHelper.filterForm = this.fb.group({
      blockId: null,
      apartmentId: null,
      month: null,
      status: null
    })
  }

  showModal(addTpl) {
    this.modal.createComponentModal(addTpl, {}, false, '')
  }

  search() {
    // later
    this.tableHelper.next();
  }

  blockSelected(e) {
    console.log(e)
    this.tableHelper.filterForm.controls['apartmentId'].setValue(null);
    this.aptsDD$ = this.apts$.pipe(
      tap(console.log),
      map(res => res.filter(x => x.blockId == e)),
      map(res => res.map((x: any) => new DropdownItem(x._id, x.name))),
      map(res => [new DropdownItem(null, 'All'), ...res])
    )
    this.search();
  }

  viewDetail(item) {
    this.router.navigate([ROUTER_CONST.BILL.DETAIL(item._id)])
  }

  refreshFilter() {
    this.tableHelper.filterForm.reset();
    this.search();
  }
}
