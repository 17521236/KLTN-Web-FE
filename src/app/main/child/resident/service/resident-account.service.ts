import { Injectable } from '@angular/core';
import { API } from 'src/app/core/api.config';
import { HttpService } from 'src/app/shared/service/http.service';

@Injectable()
export class ResidentAccountService {
  
  constructor(private http: HttpService) { }

  createAccount(body, residentId) {
    return this.http.sendToServer("POST", API.RESIDENT_ACCOUNT.ADD(residentId), body);
  }

  resetPassword(residentId) {
    return this.http.sendToServer("POST", API.RESIDENT_ACCOUNT.RESET_PASS(residentId), {});
  }
  deleteAccount(residentId){
    return this.http.sendToServer("DELETE", API.RESIDENT_ACCOUNT.DELETE(residentId), {});
  }
}
