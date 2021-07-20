import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { BillService, IFilterBill } from '../../service/bill.service';
import { STATUS_BILL_LIST } from 'src/app/core/system.config';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { Observable } from 'rxjs';
import { BlockService } from '../../../block/service/block.service';
import { ApartmentService } from '../../../apartment/service/apartment.service';
import { Location } from '@angular/common';
import { PaginatorEvent } from 'src/app/shared/component/paginator/paginator-event.model';
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
      const filter: IFilterBill = {
        start: tb.paginator.getStart(),
        limit: tb.paginator.getLimit(),
        status: tb.filterForm.value['status'],
        apartmentId: tb.filterForm.value['apartmentId'],
        month: new Date(tb.filterForm.value['month']).getTime()
      };
      return this.billService.getList(filter);
    }),
    tap(_ => this.tableHelper.isLoading = false)
  );
  status = [new DropdownItem(null, 'All'), ...STATUS_BILL_LIST.map(x => new DropdownItem(x.id, x.name))];
  blocks$ = this.blockService.getBlocks('', 0, 999).pipe(map((x: any) => x.items));
  blocksDD$ = this.blocks$.pipe(map(x => [new DropdownItem(null, 'All'), ...x.map(i => new DropdownItem(i._id, i.name))]));

  apts$ = this.aptService.getApartment(0, 999).pipe(map((res: any) => res.items));
  aptsDD$;
  aptLoading = false;
  visible = false;
  aptNotCreateBill$ = this.aptService.getApartmentDontHaveBill();
  tableHelper1: TableHelper = new TableHelper();
  result1$: Observable<any[]> = this.tableHelper1.query$.pipe(
    switchMap((table: TableHelper) => {
      return this.aptNotCreateBill$.pipe(
        map((res: any[]) =>
          res.filter((i, index) =>
            (index >= table.paginator.getStart()) && (index < table.paginator.getStart() + table.paginator.pageSize)))
      );
    }),
    tap(_ => this.tableHelper.isLoading = false)
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billService: BillService,
    private blockService: BlockService,
    private aptService: ApartmentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }
  ngOnInit(): void {
    this.location.go(`${ROUTER_CONST.BILL.LIST}`);
    this.buildForm();
    if (this.route.snapshot.queryParams.status) {
      this.tableHelper.filterForm.patchValue({
        status: this.route.snapshot.queryParams.status,
        month: new Date()
      });
    }
    if (this.route.snapshot.queryParams.showApts) {
      this.visible = true;
    }
  }

  buildForm() {
    this.tableHelper.filterForm = this.fb.group({
      blockId: null,
      apartmentId: null,
      month: null,
      status: null
    });
  }

  showModal(addTpl) {
    this.modal.createComponentModal(addTpl, {}, false, '');
  }

  search() {
    // later
    this.tableHelper.next();
  }

  blockSelected(e) {
    this.tableHelper.filterForm.controls['apartmentId'].setValue(null);
    this.aptsDD$ = this.apts$.pipe(
      map(res => res.filter(x => x.blockId === e)),
      map(res => res.map((x: any) => new DropdownItem(x._id, x.name))),
      map(res => [new DropdownItem(null, 'All'), ...res])
    );
    this.search();
  }

  viewDetail(item) {
    this.router.navigate([ROUTER_CONST.BILL.DETAIL(item._id)]);
  }

  refreshFilter() {
    this.tableHelper.filterForm.reset();
    this.search();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  onPageChange(e: PaginatorEvent) {
    this.tableHelper1.paginator = e;
    this.tableHelper1.next();
  }
  viewApt(apartment) {
    this.router.navigate([ROUTER_CONST.APARTMENT.DETAIL(apartment._id)]);
  }
}
