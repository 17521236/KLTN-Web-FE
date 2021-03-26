import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }
  createComponentModal(nzContent, initial = {}, hasCloseBtn = false, className = ''): void {
    const modal = this.modal.create({
      nzContent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: initial,
      nzFooter: null,
      nzClassName: (hasCloseBtn ? 'modal-close-btn-left' : 'modal-hide-close-btn') + ' ' + className,
    });
  }

  close(){
    this.modal.closeAll();
  }
}
