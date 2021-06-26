import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';
import { ResidentReq, SingleResidentRes } from '../model/resident.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private http: HttpService) { }
  getResident(start = 0, limit = 5, name = null, type = null, aptId = null, blockId = null): Observable<any> {
    return this.http.sendToServer("GET", API.RESIDENT.GET_ALL, null, null, { start, limit, name, type, aptId, blockId }).pipe(shareReplay());
  }
  getResidentById(id): Observable<any> {
    return this.http.sendToServer("GET", API.RESIDENT.GET_ONE(id)).pipe(shareReplay());
  }
  addResident(data) {
    const tmp: ResidentReq = new ResidentReq(data);
    console.log(tmp)
    return this.http.sendToServer("POST", API.RESIDENT.ADD, tmp).pipe(shareReplay());
  }
  updateResident(id, data) {
    const tmp: ResidentReq = new ResidentReq(data);
    return this.http.sendToServer("PATCH", API.RESIDENT.UPDATE(id), tmp).pipe(shareReplay());
  }
  delete(id) {
    return this.http.sendToServer("DELETE", API.RESIDENT.DELETE(id)).pipe(shareReplay());
  }
  deleteAccount(id) {
    return this.http.sendToServer("DELETE", API.RESIDENT.DELETE_ACCOUNT(id)).pipe(shareReplay());
  }

  createAccount(id) {
    return this.http.sendToServer("POST", API.RESIDENT.CREATE_ACCOUNT(id)).pipe(shareReplay());
  }

  resetPassword(id) {
    return this.http.sendToServer("POST", API.RESIDENT.RESET_PASSWORD(id)).pipe(shareReplay());
  }
}
