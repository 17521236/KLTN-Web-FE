import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { PaginatorEvent } from 'src/app/shared/component/paginator/paginator-event.model';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { BlockService } from '../../service/block.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {

  isLoading = false;

  @ViewChild('modal') modal: ActionModalComponent;
  tableHelper: TableHelper = new TableHelper();
  result$: Observable<any> = this.tableHelper.query$.pipe(
    switchMap((x: any) => {
      return this.blockService.getBlocks(
        x.filterForm.value['searchText'],
        x.paginator.getStart(),
        x.paginator.pageSize
      );
    }),
    tap(_ => this.tableHelper.isLoading = false)
  );

  showRightMenu = false;

  constructor(
    private blockService: BlockService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.tableHelper.filterForm = this.fb.group({ searchText: '' });
  }
  ngOnInit(): void {
  }
  viewDetail(block) {
    this.router.navigate([ROUTER_CONST.BLOCK.DETAIL, block._id]);
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
