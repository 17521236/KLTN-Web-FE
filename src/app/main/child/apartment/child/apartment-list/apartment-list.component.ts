import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { PaginatorEvent } from 'src/app/shared/component/paginator/paginator-event.model';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { BlockService } from '../../../block/service/block.service';
import { ApartmentService } from '../../service/apartment.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {

  @ViewChild('modal') modal: ActionModalComponent;

  tableHelper: TableHelper = new TableHelper();
  result$: Observable<any> = this.tableHelper.query$.pipe(
    switchMap((x: TableHelper) => {
      return this.aptService.getApartment(x.paginator.getStart(), x.paginator.pageSize, x.filterForm.value['name'], x.filterForm.value['blockId']);
    }),
    tap(_ => this.tableHelper.isLoading = false)
  );
  blocks$ = this.blockService.getBlocks('', 0, 999);
  blocksDD$ = this.blocks$.pipe(map((x: any) => {
    const tmp = x.items.map(item => new DropdownItem(item._id, item.name));
    tmp.unshift(new DropdownItem('', 'All'));
    return tmp;
  }));
  blocksP$ = this.blocks$.pipe(map((x: any) => x.items))
  showRightMenu = false;

  constructor(private router: Router, private aptService: ApartmentService, private blockService: BlockService, private fb: FormBuilder) {
    this.tableHelper.filterForm = this.fb.group({
      blockId: '',
      name: ''
    });
  }

  ngOnInit(): void {
  }

  onPageChange(e: PaginatorEvent) {
    this.tableHelper.paginator = e;
    this.tableHelper.next();
  }
  viewDetail(apartment) {
    this.router.navigate([ROUTER_CONST.APARTMENT.DETAIL(apartment._id)]);
  }
  search() {
    // later
    this.tableHelper.next();
  }
  showModal(tpl) {
    this.modal.createComponentModal(tpl, {}, false, '')
  }
  success() {
    this.tableHelper.next();
  }
  refreshFilter() {
    this.tableHelper.filterForm.reset();
    this.tableHelper.next();
  }
}
