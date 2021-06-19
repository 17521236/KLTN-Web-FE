import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { JSUtils } from '../utils/main-utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private http: HttpClient, private msg: ToastrService) { }

    public sendToServer(method: string, api: string, bd?: any, hd?: any, pr?: any) {
        let url = environment.endPoint + api;
        let ret: Observable<any>;
        let body = bd || {};
        let header = hd || { 'Content-Type': 'application/json' };

        if (pr) Object.keys(pr).forEach(element => {
            if (pr[element] === '' || typeof (pr[element]) == 'undefined' || pr[element] == null) {
                delete pr[element];
            }
        });
        const params = new HttpParams({ fromObject: pr });
        console.log(url)
        switch (method) {
            case 'GET':
                ret = this.http.get(url, {
                    headers: header,
                    observe: 'body',
                    params: params
                });
                break;
            case 'POST':
                ret = this.http.post(url, body, {
                    headers: header,
                    observe: 'body',
                    params: params
                });
                break;
            case 'PATCH':
                ret = this.http.patch(url, body, {
                    headers: header,
                    observe: 'body',
                    params: params
                });
                break;
            case 'PUT':
                ret = this.http.put(url, body, {
                    headers: header,
                    observe: 'body',
                    params: params
                });
                break;
            case 'DELETE':
                ret = this.http.delete(url, {
                    headers: header,
                    observe: 'body',
                    params: params
                });
                break;
            default:
                break;
        }
        return new Observable(obs => {
            ret.subscribe(res => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                JSUtils.commonHandleError(err, this.msg);
                obs.error(err);
            });
        })
    }
}