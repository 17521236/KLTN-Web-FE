import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options: DropdownItem[] = [
    new DropdownItem(0,'Item 1'),
    new DropdownItem(2,'Item 2')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
