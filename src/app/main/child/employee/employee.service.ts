import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';

@Injectable()
export class EmployeeService {

  constructor(
    private http: HttpService
  ) { }

  getLists(){
    return this.http.sendToServer('GET', API.EMPLOYEE.GET_ALL, null, null, null).pipe(shareReplay());
  }

  add(data) {
    return this.http.sendToServer('POST', API.EMPLOYEE.ADD, data, null, null).pipe(shareReplay());
  }

  getOne(id){
    return this.http.sendToServer('GET', API.EMPLOYEE.GET_ONE(id), null, null, null).pipe(shareReplay());
  }

  update(id, data) {
    return this.http.sendToServer('PATCH', API.EMPLOYEE.UPDATE(id), data).pipe(shareReplay());
  }
  delete(id){
    return this.http.sendToServer('DELETE', API.EMPLOYEE.DELETE(id)).pipe(shareReplay());
  }
}
