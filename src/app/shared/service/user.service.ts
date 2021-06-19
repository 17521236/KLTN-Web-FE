import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from './http.service';

@Injectable()
export class UserService {

  constructor(private http: HttpService) { }
  login(data){
    return this.http.sendToServer('POST', API.EMPLOYEE.LOGIN, data, null).pipe(shareReplay());
  }
}
