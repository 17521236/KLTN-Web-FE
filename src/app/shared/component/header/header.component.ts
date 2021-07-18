import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageName = '';
  @Input() isShowClose = true;
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  closePage() {
      this.close.emit('');
  }
}
