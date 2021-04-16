import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';
import { VehicleReq } from '../model/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpService) { }
  getVehicle(start = 0, limit = 5, residentId = null, licensePlate = null, type = null, status = null) {
    console.log({ start, limit, status, residentId, type, licensePlate });
    return this.http.sendToServer("GET", API.VEHICLE.GET_ALL, null, null,{ start, limit, status, residentId, type, licensePlate }).pipe(shareReplay());
  }
  getVehicleById(id) {
    return this.http.sendToServer("GET", API.VEHICLE.GET_ONE(id)).pipe(shareReplay());
  }
  addVehicle(data) {
    const tmp: VehicleReq = new VehicleReq(data);
    console.log(tmp)
    return this.http.sendToServer("POST", API.VEHICLE.ADD, tmp).pipe(shareReplay());
  }
  updateVehicle(id, data) {
    const tmp: VehicleReq = new VehicleReq(data);
    return this.http.sendToServer("PATCH", API.VEHICLE.UPDATE(id), tmp).pipe(shareReplay());
  }
}
