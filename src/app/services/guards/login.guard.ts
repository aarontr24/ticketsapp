import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this._userService.isLogin()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('Bloqueado por guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
