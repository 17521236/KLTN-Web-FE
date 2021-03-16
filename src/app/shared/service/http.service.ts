import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType, HttpParameterCodec, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HTTP_ERROR_CODE_HEADER, LOGIN_TOKEN } from '../../const/system.const';
import { forkJoin } from 'rxjs';
declare const ENDPOINT_PRO;
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private http: HttpClient, private router: Router) { }
    /*
    *method : http method.
    *api : api url
    *body : request body/header in json
    *onSuccess : callback function when http return success
    *onError: (optional) callback when response error. Default function is showing toast message or default action by erorr code
    */
    public sendToServer(method: string, api: string, body: any, header: any, onSuccess, onError?) {
        api = (environment.production ? ENDPOINT_PRO : environment.endPoint) + api;
        let bd = body || {};
        let head = header || { 'Content-Type': 'application/json' };
        if (localStorage.getItem(LOGIN_TOKEN)) {
            head["Authorization"] = localStorage.getItem(LOGIN_TOKEN);
        }
        const headers = new HttpHeaders(head);
        if (!method) {
            return;
        }
        let request;
        switch (method.toLowerCase()) {
            case 'get':
                const _body = { ...bd };
                _body.random = new Date().getTime();
                Object.keys(_body).forEach(element => {
                    if (_body[element] === '' || typeof (_body[element]) == 'undefined') {
                        delete _body[element];
                    }
                });
                const params = new HttpParams({ fromObject: _body, encoder: new CustomHttpParamEncoder() });
                request = this.http.get(api, {
                    headers: headers,
                    params: params,
                    observe: 'response',
                    withCredentials: true
                });
                break;
            case 'post':
                request = this.http.post(api, bd, {
                    headers: headers,
                    observe: 'response',
                    withCredentials: true
                });
                break;
            case 'put':
                request = this.http.put(api, bd, {
                    headers: headers,
                    withCredentials: true
                });
                break;
            case 'delete':
                request = this.http.delete(api, {
                    headers: headers,
                    withCredentials: true
                });
                break;
            case 'upload':
                request = this.http.post(api, bd, {
                    headers: headers,
                    observe: 'events',
                    reportProgress: true,
                    withCredentials: true
                });
                break;
            case 'download':
                request = this.http.get(api, {
                    headers: headers,
                    observe: 'response',
                    withCredentials: false,
                    responseType: 'arraybuffer'
                });
                break;
            default:
                break;
        }

        return request.subscribe(
            (data) => {
                if (method == 'upload') {
                    console.log('data', data);
                    if (data.type === HttpEventType.UploadProgress) {
                        let progress = 0;
                        if (data.total) {
                            progress = Math.round(100 * data.loaded / data.total);
                        }
                        onSuccess({ type: 'progress', value: progress });
                    } else if (data.type === HttpEventType.Response) {
                        onSuccess({ type: 'completed', value: data.body });
                    }
                } else {
                    // TODO :implement more logic  if require

                    onSuccess(data.body);

                    // if (data && data.headers.get('aurora-errorcode') == 0) {
                    //     if (typeof onSuccess === 'function') {
                    //         const expiry = data.headers.get('aurora-token-expiry');
                    //         if (expiry > 0) {
                    //             JSUtils.setStorage(TOKEN_TIME_OUT, expiry + '');
                    //         }

                    //         const currentServerTime = data.headers.get('AURORA-Current');
                    //         let diff = 0;
                    //         if (currentServerTime > 0) {
                    //             const currentTime = new Date().getTime();
                    //             diff = currentServerTime - currentTime;
                    //             JSUtils.setStorage(SYSTEM_DIFF_TIME, diff.toString(), true);
                    //         }


                    //         if (method == 'DOWNLOAD') {
                    //             onSuccess(data);
                    //         } else {
                    //             onSuccess(data.body);
                    //         }
                    //     }
                    // } else if (data) {
                    //     this.handleError(data, onError, bd);
                    // }

                }
            },
            error => {
                this.handleError(error, onError, bd);
            }
        );
    }

    public sendToServerMulti(method: string, apis: Array<string>, body: Array<any>, header: any, onSuccess, onError?) {
        const arrRequest: Array<any> = [];
        for (let i = 0; i < apis.length; i++) {
            let api = (environment.production ? ENDPOINT_PRO : environment.endPoint) + apis[i];
            // let bd = body || {};
            const head = header || { 'Content-Type': 'application/json' };
            const headers = new HttpHeaders(head);
            if (!method) {
                return;
            }
            let request;
            switch (method.toLowerCase()) {
                case "get":
                    let _body = { ...body[i] };
                    Object.keys(_body).forEach(element => {
                        if (_body[element] === '' || typeof (_body[element]) == 'undefined') {
                            delete _body[element];
                        }
                    });
                    // console.log(_body);
                    const params = new HttpParams({ fromObject: _body, encoder: new CustomHttpParamEncoder() });
                    request = this.http.get(api, {
                        headers: headers,
                        params: params,
                        observe: 'response',
                        withCredentials: true
                    });
                    arrRequest.push(request);
                    break;
                case 'post':
                    _body = { ...body[i] };
                    request = this.http.post(api, _body, {
                        headers: headers,
                        observe: 'response',
                        withCredentials: true
                    });
                    arrRequest.push(request);
                    break;
                default:
                    break;
            }
        }

        return forkJoin(arrRequest).subscribe(
            results => {
                const responseData: Array<any> = [];
                let i;
                for (i = 0; i < results.length; i++) {
                    const data: any = results[i];
                    if (data) {
                        if (typeof onSuccess === 'function') {
                            responseData.push(data.body);
                        }
                    } else if (data) {
                        this.handleError(data, onError);
                    }
                }
                if (i == results.length && responseData.length == i) {
                    onSuccess(responseData);
                }
            },
            error => {
                this.handleError(error, onError);
            }
        );
    }





    public handleSuccess(res) {
        let re;
        try {
            re = res.json();
        } catch {
            re = res;
        }
        return re;
    }

    handleError(error, callback, requestBody?) {
        // if(!error.headers){
        //   return;
        // }
        // const deActivated = error.headers.get('AURORA-Token-Deactivated');
        const errorCode = error.headers.get(HTTP_ERROR_CODE_HEADER) || error.status;
        if (errorCode == 401) {
            // TODO Implement more logic, may be ret
        }
        if (errorCode == 403) {
            // this.toast.error("Forbidden");
        }
        if (errorCode == 404) {
            //this.toast.error('Wrong access');
            return false;
        }

        if (typeof callback === 'function') {
            callback(error);
        } else {
            if (errorCode != 401) {
                // error.headers.get(AURORA_ERROR) && this.toast.error(error.headers.get(AURORA_ERROR));
                //parse and display error message
            }
        }
    }
}

export class CustomHttpParamEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }
    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }
    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}