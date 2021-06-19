import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';

export interface IFilter {
  start: number,
  limit: number
}

export interface IFilterBill extends IFilter {
  status: string,
  apartmentId: string,
  month: string
}

export interface IAddBillReq {
  apartmentId: string,
  pmId: string,
  date: number,
  status: string,
  amount: number,
  details: {
    electronic: number,
    water: number,
    internet: number,
    service: number,
    parking_bycircle: number,
    parking_car: number,
    parking_motobike: number,
    orther: number
  }
}

@Injectable()
export class BillService {

  constructor(private http: HttpService) { }
  getList(filter: IFilterBill) {
    return this.http.sendToServer("GET", API.BILL.GET_ALL, null, null, filter).pipe(shareReplay());
  }
  create(data: IAddBillReq) {
    return this.http.sendToServer('POST', API.BILL.ADD, data, null).pipe(shareReplay());
  }
  getOne(id) {
    return this.http.sendToServer("GET", API.BILL.GET_ONE(id), null, null).pipe(shareReplay());
  }
  // update(data, id) {
  //   return this.http.sendToServer('PATCH', API.BILL.UPDATE(id), data, null).pipe(shareReplay());
  // }
  // deleteOne(id) {
  //   return this.http.sendToServer('DELETE', API.BILL.DELETE(id)).pipe(shareReplay());
  // }
  getCostByAptId(id) {
    return this.http.sendToServer('POST', API.BILL.COST, { id }, null).pipe(shareReplay());
  }
}
