import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private http: HttpClient, private router: Router) { }

    public sendToServer(method: string, api: string, body?: any, header?: any, params?: any) {
        let url = environment.endPoint + api;
        console.log(url)
        let ret;
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
        return ret;
    }
}