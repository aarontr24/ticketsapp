import { Component, OnInit } from '@angular/core';
import { RechargeService } from '../../services/recharge/recharge.service';
import { Recharge } from '../../models/recharge.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recharges',
  templateUrl: './recharges.component.html',
  styles: []
})
export class RechargesComponent implements OnInit {

  recharges: Recharge[];
  countRecharges = 0;
  totalTrue = 1;
  totalFalse = 0;

  constructor(
    public _rechargeService : RechargeService
  ) { }

  ngOnInit(): void {
    this.loadRecharges();
  }

  loadRecharges() {
    this._rechargeService.getAllRecharges()
      .subscribe((resp: any) => {
        console.log(resp);
        this.countRecharges = resp.count;
        this.recharges = resp.rechargesDB;
        const tt = resp.totalCheck.find(x => x._id === true);
        const tf = resp.totalCheck.find(x => x._id === false);
        if (tt) {
          this.totalTrue = resp.totalCheck.find(x => x._id === true).total;
        }
        if (tf) {
          this.totalFalse = resp.totalCheck.find(x => x._id === false).total;
        }
        // this.totalTrue = resp.
        // console.log(resp.totalCheck[0].total);

      });
  }

  deleteRecharge(item) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de eliminar el item de ' + item.amount,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      
      console.log(result);
      
      if (result.value) {
        this._rechargeService.deleteRecharge(item._id)
          .subscribe(ok => {
            console.log(ok);
            Swal.fire(
              '¡Eliminado!',
              'Se elimino el item',
              'success'
            );
            this.loadRecharges();
          });
      }
    });

  }

  checkRecharge(item) {
    let check: boolean;
    if (item.checkPay === true) {
      check = false;
    } else {
      check = true;
    }
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de aprobar el item de ' + item.amount + ' ' + item.userPay.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, aprobar!'
    }).then((result) => {
      
      console.log(result);
      
      if (result.value) {
        this._rechargeService.checkRecharge(item._id, check)
          .subscribe(ok => {
            console.log(ok);
            Swal.fire(
              '¡Aprobado!',
              'Se aprobó el item',
              'success'
            );
            this.loadRecharges();
          });
      }
    });
  }

}
