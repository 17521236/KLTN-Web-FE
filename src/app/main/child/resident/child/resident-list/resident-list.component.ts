import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { RESIDENT_TYPE_LIST } from 'src/app/core/system.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { PaginatorEvent } from 'src/app/shared/component/paginator/paginator-event.model';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { ApartmentService } from '../../../apartment/service/apartment.service';
import { BlockService } from '../../../block/service/block.service';
import { ResidentRes } from '../../model/resident.model';
import { ResidentService } from '../../service/resident.service';

@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.scss']
})
export class ResidentListComponent implements OnInit {

  @ViewChild('modal') modal: ActionModalComponent;

  tableHelper: TableHelper = new TableHelper();
  result$: Observable<{
    total: number,
    items: ResidentRes[]
  }> = this.tableHelper.query$.pipe(
    switchMap((x: TableHelper) => {
      return this.residentService.getResident(
        x.paginator.getStart(),
        x.paginator.pageSize,
        x.filterForm.value['name'],
        x.filterForm.value['type'],
        x.filterForm.value['aptId'],
        x.filterForm.value['blockId']
      );
    })
  )
  blocks$ = this.blockService.getBlocks('', 0, 999).pipe(map((x: any) => {
    let tmp = x.items.map(item => new DropdownItem(item._id, item.name));
    tmp.unshift(new DropdownItem('', 'All'));
    return tmp;
  }));
  apt$;
  showRightMenu = false;
  RESIDENT_TYPE_LIST = RESIDENT_TYPE_LIST;
  RESIDENT_TYPE = [new DropdownItem('', 'All'), ...RESIDENT_TYPE_LIST].map(x => new DropdownItem(x.id, x.text));

  constructor(
    private router: Router,
    private residentService: ResidentService,
    private aptService: ApartmentService,
    private blockService: BlockService,
    private fb: FormBuilder) {
    this.tableHelper.filterForm = this.fb.group({
      name: "",
      type: "",
      aptId: "",
      blockId: ""
    });
  }

  ngOnInit(): void {
  }
  onPageChange(e: PaginatorEvent) {
    this.tableHelper.paginator = e;
    this.tableHelper.next();
  }
  viewDetail(resident) {
    this.router.navigate([ROUTER_CONST.RESIDENT.DETAIL(resident._id)]);
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

  blockSelected(e) {
    this.apt$ = this.aptService.getApartment(0, 999, '', e).pipe(map((x: any) => {
      let tmp = x.items.map(item => new DropdownItem(item._id, item.name));
      tmp.unshift(new DropdownItem('', 'All'));
      return tmp;
    }));
    this.search();
  }
}
