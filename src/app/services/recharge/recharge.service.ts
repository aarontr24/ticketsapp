import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { Recharge } from 'src/app/models/recharge.model';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  token = '';

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) {
    this.token = _userService.token;
  }


  createRecharge(recharge: Recharge) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/recharge/create';
    return this.http.post(url, recharge, {headers});
      // .pipe(
      //   map((resp: any) => {
      //     Swal.fire('Recarga realizada', `Por el monto de: ${recharge.amount.toString()}`, 'success');
      //     return resp;
      //   })
      // );
  }

  getRecharges() {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/recharge';
    return this.http.get(url, {headers});
  }

  getAllRecharges() {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/recharge/all';
    return this.http.get(url, {headers});
  }

  deleteRecharge(_id: string) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/recharge/delete';
    return this.http.post(url, {_id}, {headers});
  }

  checkRecharge(r_id: string, check: boolean) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/recharge/checkpay';
    return this.http.put(url, {r_id, check}, {headers});
  }
  
}

