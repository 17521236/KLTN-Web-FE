import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageName = '';
  @Input() isShowClose = true;
  @Input() back = false;
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  closePage() {
    if (this.back) {
      history.back();
    } else {
      this.close.emit('');
    }
  }
}
