import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpService) { }

  blocks = [{
    name: 'Block 1',
    totalApartment: 30,
    totalResident: 213,
    desc: 'Description'
  }]

  getBlocks(name, start, limit) {
    return of(this.blocks);
    return new Observable(obs => {
      this.http.sendToServer("GET", API.BLOCK.GET_ALL, {}, { name: name },
        (res) => {
          obs.next(res);
          obs.complete();
        });
    })
  }
}
