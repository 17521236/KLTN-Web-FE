import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';
import { ApartmentReq } from '../model/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpService) { }
  getApartment(start = 0, limit = 5, name = '', blockId = undefined) {
    // console.log(API.APARTMENT.GET_ALL, null, null, { name, start, limit, blockId })
    // return of([])
    console.log({ name, start, limit, blockId });
    return this.http.sendToServer("GET", API.APARTMENT.GET_ALL, null, null, { name, start, limit, blockId }).pipe(shareReplay());
  }
  getApartmentById(id) {
    return this.http.sendToServer("GET", API.APARTMENT.GET_ONE(id)).pipe(shareReplay());
  }
  addApartment(data) {
    const tmp: ApartmentReq = new ApartmentReq(data);
    return this.http.sendToServer("POST", API.APARTMENT.ADD, tmp).pipe(shareReplay());
  }
  updateApartment(id, data) {
    const tmp: ApartmentReq = new ApartmentReq(data);
    return this.http.sendToServer("PATCH", API.APARTMENT.UPDATE(id), tmp).pipe(shareReplay());
  }
  delete(id){
    return this.http.sendToServer("DELETE", API.APARTMENT.DELETE(id)).pipe(shareReplay());
  }
}
