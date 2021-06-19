import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpService
  ) { }

  getDashboard(){
    return this.http.sendToServer("GET", API.DASHBOARD.GET_ALL, null, null, null).pipe(shareReplay());
  }
}
