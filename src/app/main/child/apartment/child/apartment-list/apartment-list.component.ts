import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
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

  form: FormGroup = this.fb.group({
    blockId: null,
    name: ''
  });
  tableHelper: TableHelper = new TableHelper();
  result$: Observable<any> = this.tableHelper.query$.pipe(
    switchMap((x: any) => {
      return this.aptService.getApartment(x.paginator.getStart(), x.paginator.pageSize, x.searchText)
    })
  )
  blocks$ = this.blockService.getBlocks().pipe(map((x: any) => x.items));
  showRightMenu = false;

  constructor(private router:Router, private aptService: ApartmentService, private blockService: BlockService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onPageChange(e: PaginatorEvent) {
    this.tableHelper.paginator = e;
    this.tableHelper.next();
  }
  viewDetail(block) {
    this.router.navigate([ROUTER_CONST.BLOCK.DETAIL, block._id]);
  }
  search() {
    this.tableHelper.searchText = this.form.value['searchText'];
    this.tableHelper.next();
  }
  showModal(tpl){
    this.modal.createComponentModal(tpl,{},false,'')
  }
  success(){
    this.tableHelper.next();
  }
}
