import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment';
import { CreateBlockReq, UpdateBlockReq } from '../model/block.model';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpService, private httpC: HttpClient) { }
  getBlocks(name = '', start = 0, limit = 5) {
    return this.http.sendToServer("GET", API.BLOCK.GET_ALL, null, null, { name, start, limit }).pipe(shareReplay());
  }
  getBlockById(id) {
    return this.http.sendToServer("GET", API.BLOCK.GET_ONE(id)).pipe(shareReplay());
  }
  addBlock(data) {
    const tmp: CreateBlockReq = new CreateBlockReq(data);
    return this.http.sendToServer("POST", API.BLOCK.ADD, tmp).pipe(shareReplay());
  }
  updateBlock(id, data) {
    const tmp: UpdateBlockReq = new UpdateBlockReq(data);
    return this.http.sendToServer("PATCH", API.BLOCK.UPDATE(id), tmp).pipe(shareReplay());
  }
  delete(id){
    return this.http.sendToServer("DELETE", API.BLOCK.DELETE(id)).pipe(shareReplay());
  }
}
