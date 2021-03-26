import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  success(msg: string, time = 3000) {
    this.snackbarService.add({
      msg,
      timeout: time,
      background: '#042355',
      color: '#ffffff',
    });
  }
  error(msg: string, time = 3000) {
    this.snackbarService.add({
      msg,
      timeout: time,
      background: '#343434',
      color: '#2196f3',
    });
  }
  warning(msg: string, time = 3000) {
    this.snackbarService.add({
      msg,
      timeout: time,
      background: '#343434',
      color: '#2196f3',
    });
  }

}
