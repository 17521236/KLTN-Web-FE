import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorEvent } from './paginator-event.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() total = 0;
  @Input() isDisabled = false;
  @Output() onPageChange = new EventEmitter<PaginatorEvent>();

  @Input() currentPage = 1;
  @Input() pageSizeOptions = [5, 10, 15];
  @Input() pageSize = 5;
  @Input() size = 'medium';
  constructor() {
  }

  ngOnInit(): void {
  }

  changePage($event) {
    this.currentPage = $event;
    this.emitEvent();
  }

  changePageSize($event) {
    this.pageSize = $event;
    this.emitEvent();
  }

  emitEvent() {
    let event = new PaginatorEvent(this.currentPage, this.pageSize);
    this.onPageChange.emit(event);
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPageSize() {
    return this.pageSize;
  }

  getCurrentEvent(){
    return  new PaginatorEvent(this.currentPage, this.pageSize);
  }

}

