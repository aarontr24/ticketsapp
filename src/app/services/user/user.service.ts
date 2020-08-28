import { Injectable, NgZone } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private zone: NgZone
    ) {
    console.log('Servicio de usuario listo');
    this.loadStorage();
  }

  isLogin() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;    }
  }

  saveStorage(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + '/user/google';
    return this.http.post(url, {token})
      .pipe(
        map((resp: any) => {
          this.saveStorage(resp.token, resp.user);
          return resp.new;
        }),
        catchError(err => {
          // console.log(err.error.message);
          Swal.fire('Login Incorrecto', err.error.message, 'error');
          // return err;
          return throwError(err);
        })
      );
  }

  login(user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/user/login';
    return this.http.post(url, user)
      .pipe(
        map((resp: any) => {
          this.saveStorage(resp.token, resp.user);
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('user', JSON.stringify(resp.user));
          return true;
        }),
        catchError(err => {
          // console.log(err.error.message);
          Swal.fire('Login Incorrecto', err.error.message, 'error');
          // return err;
          return throwError(err);
        })
      );
  }

  createUser(user: User) {
    const url = URL_SERVICES + '/user/register';
    return this.http.post(url, user)
      .pipe(
        map((resp: any) => {
          this.saveStorage(resp.token, resp.user);
          Swal.fire('Usuario creado', user.email, 'success');
          return resp;
        })
      );
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/user/update';
    return this.http.post(url, user, {headers})
      .pipe(
        map((resp: any) => {
          this.saveStorage(resp.token, resp.user);
          Swal.fire('Usuario actualizado!', user.email, 'success');
          return resp;
        }),
        catchError(err => {
          // console.log(err.error.err.code);
          if (err.error.err.code === 11000) {
            Swal.fire('No se pudo actualizar', `${err.error.err.keyValue.email} ya existe`, 'error');
            // return err;
            return throwError(err);
          } else {
            Swal.fire('No se pudo actualizar', err.error.err.codeName, 'error');
            return throwError(err);
          }
        })
      );
  }

  getUserByMovil(movil: string) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICES + '/user/userbymovil';
    return this.http.post(url, {movil}, {headers});
  }

  // resettoken

  requestReset(body) {
    const url = URL_SERVICES + '/user/req-reset-password';
    return this.http.post(url, body);
  }

  newPassword(body) {
    const url = URL_SERVICES + '/user/new-password';
    return this.http.post(url, body);
  }

  ValidPasswordToken(body) {
    const url = URL_SERVICES + '/user/valid-password-token';
    return this.http.post(url, body);
  }

}
