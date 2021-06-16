import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpService) { }
  getList(filter) {
    return this.http.sendToServer("GET", API.SERVICE.GET_ALL, null, null, { ...filter }).pipe(shareReplay());
  }
  create(data) {
    return this.http.sendToServer('POST', API.SERVICE.ADD, data, null).pipe(shareReplay());
  }
  getOne(id) {
    return this.http.sendToServer("GET", API.SERVICE.GET_ONE(id), null, null).pipe(shareReplay());
  }
  update(data, id) {
    return this.http.sendToServer('PATCH', API.SERVICE.UPDATE(id), data, null).pipe(shareReplay());
  }
  deleteOne(id) {
    return this.http.sendToServer('DELETE', API.SERVICE.DELETE(id)).pipe(shareReplay());
  }
}
