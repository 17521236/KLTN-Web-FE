import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
import { SnackbarService } from 'ngx-snackbar';
@Injectable({
    providedIn: 'root'
})

export class AppSnackbarService {
    constructor(private snackbarService: SnackbarService) { }
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