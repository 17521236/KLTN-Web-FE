import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ToastrService {
    constructor(private snackbarService: ToastrService) { }
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