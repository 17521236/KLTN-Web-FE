import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { MOCK_API_DEFINED } from "./defined-patterns";
const MOCK_PROTOCOL = 'mock-apis://';
const MOCK_PATH_ASSETS = 'assets/mock-apis';
export const isMock = environment.mock;
@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private http: HttpClient) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf(MOCK_PROTOCOL) >= 0 || request.params.get('mockapis') == '1') {
            // need to process normal follow to get data from assets folder
            return from(next.handle(request).toPromise());
        }
        if (isMock == true) {
            return from(this.handle(request, next));
        }
        return from(next.handle(request).toPromise());
    }
    /**
   * Intercept and handle response
   * @param request
   * @param next
   */
    async handle(request: HttpRequest<any>, next: HttpHandler) {
        const fileMockPath: string[] = this.getMockFileFromURL(request);
        let data = null;
        if (fileMockPath[0] == fileMockPath[1]) {
            data = await this.fetchMockData(fileMockPath[0]);
        } else {
            data = await this.fetchMockData(fileMockPath[1]);
            if (typeof (data) == 'undefined' || data === null) {
                data = await this.fetchMockData(fileMockPath[0]);
            }
        }

        if (typeof (data) == 'undefined' || data === null) {
            return next.handle(request).toPromise();
        }
        const tokenExpired = (new Date()).getTime() + 1000000;
        const headers = new HttpHeaders({ 'aurora-errorcode': '0', 'aurora-token-expiry': tokenExpired.toString() });
        return of(new HttpResponse({ status: 200, headers: headers, body: ((data) as any), url: request.url })).toPromise();
    }

    private async fetchMockData(path: string) {
        return await this.http.get(path, {
            responseType: 'json',
            params: {
                mockapis: '1'
            }
        }
        ).toPromise().catch((error) => {

        });
    }

    private getMockFileFromURL(request: HttpRequest<any>): string[] {
        const fileMockPath = new Array();
        const params = request.params.toString();
        // find in pattern first if there is any

        let url = request.url.replace('https://', '').replace('http://', '');
        const parts = url.split('/');
        let tem = url.replace(parts[0], "");
        let arr = tem.split("/");
        arr.forEach(el => {
            if (typeof el === 'number') {
                el = "1";
            }
        });
        tem = arr.join("/");
        if (parts.length) {
            url = url.replace(parts[0] + '/', '').replace(/\//g, '.');
            if (MOCK_API_DEFINED.PATTERNS.length > 0) {
                for (const index in MOCK_API_DEFINED.PATTERNS) {
                    const definedAPI = MOCK_API_DEFINED.PATTERNS[index];
                    //let arr = definedAPI.pattern.source.split('\/');

                    // const result = tem.match(definedAPI.pattern);

                    // if (typeof result != 'undefined' && result != null && arr.length == parts.length - 1) {
                    //     url = definedAPI.target.replace('.json', '');
                    // }
                    if(tem == definedAPI.pattern){
                        url = definedAPI.target.replace('.json', '');
                    }
                }
            }
        }

        // let domainType = environment.type;
        const rootPath = MOCK_PATH_ASSETS;
        fileMockPath[0] = rootPath + '/' + url + '.json';
        fileMockPath[1] = rootPath + '/' + url + params.replace(/\=/g, '.').replace(/\&/g, '.') + '.json';
        return fileMockPath;
    }

}