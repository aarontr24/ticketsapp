import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { User } from '../../models/user.model';
import { Recharge } from '../../models/recharge.model';
import { UserService } from '../../services/user/user.service';
import { RechargeService } from '../../services/recharge/recharge.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styles: []
})
export class PointsComponent implements OnInit {

  @ViewChild('amount') amountElement: ElementRef;

  user: User;
  recharges: Recharge[];
  countRecharges = 0;
  totalTrue = 1;
  totalFalse = 0;
  totalPoints = 1;
  history = false;
  userFriend: User;

  formAmount: FormGroup;
  formFriend: FormGroup;


  constructor(
    public _userService: UserService,
    public _rechargeService: RechargeService,
    private zone: NgZone,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.user = this._userService.user;
    this.userFriend = this.user;
    this.Init();
    

    this.loadRecharges();
    
  }

  Init() {
    this.formAmount = new FormGroup({
      amount: new FormControl(1, Validators.required)
    });
    this.formFriend = new FormGroup({
      movilFriend: new FormControl(null, Validators.required)
    });

    if (this.user.movil === '999999999') {
      Swal.fire({
        title: 'Por favor registra tu número de celular',
        text: 'Este se usará para realizar el sorteo',
        icon: 'info',
        confirmButtonText: 'OK!'
      });
      this.zone.run(() =>
        this.router.navigate(['/profile'])
      );
    }
  }

  loadRecharges() {
    this._rechargeService.getRecharges()
      .subscribe((resp: any) => {
        console.log(resp);
        this.countRecharges = resp.count;
        this.recharges = resp.recharges;
        if (resp.totalPoints.length > 0) {
          this.totalPoints = resp.totalPoints[0].total;
        }
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

  onClick() {
    if (this.history === false) {
      this.history = true;
    } else {
      this.history = false;
    }
  }

  findFriend() {
    this._userService.getUserByMovil(this.formFriend.value.movilFriend)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.userFriend = resp.user;  
        },
        err => {
          Swal.fire('Upss!', err.error.message, 'error');
        }
      );
  }

  addRecharge(amount: number) {
    // console.log('Usuario', this.userFriend._id);
    // console.log('Monto', this.formAmount.value.amount || amount);

    if (!amount || amount === null) {
      Swal.fire('Upss!', 'Debe ingresar un monto', 'error');
    }

    const recharge: Recharge = {
      user: this.userFriend._id,
      userPay: this.user._id,
      amount
    };

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de añadir ' + amount + ' soles a ' + this.userFriend.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, añadir!'
    }).then((result) => {
      
      console.log(result);
      
      if (result.value) {
        this._rechargeService.createRecharge(recharge)
          .subscribe(ok => {
            // console.log(ok);
            Swal.fire({
              title: 'Por apoyar a nuestros sin voz',
              text: 'Realiza tu deposito en las cuentas al final de la página y envia tu confirmación al 989079025. El pago se hará efectivo dentro de las 24 horas',
              width: 400,
              padding: '.5em',
              background: '#fff url(../../assets/imgs/patitas.jpg)',
              backdrop: `
                rgba(0,0,123,0.4)
                url("../../assets/imgs/cat.gif")
                left top
                no-repeat
              `,
              imageUrl: '../../assets/imgs/gracias.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image'
            })
            // Swal.fire(
            //   'Se Añadió '+ amount + ' soles a ' + this.userFriend.name,
            //   'Gracias por apoyar a los sin voz',
            //   'success'
            // );
            this.loadRecharges();
          });
      }
      this.userFriend = this.user;
      this.formFriend.reset();
    });
  }

  focusAmount() {
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.amountElement.nativeElement.focus();
    }, 0);
  }

  deleteRecharge(item: Recharge) {
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
            // console.log(ok);
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

}
