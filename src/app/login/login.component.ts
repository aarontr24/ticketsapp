import { Component, OnInit, ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('emailogin') emailoginElement: ElementRef;
  @ViewChild('passlogin') passloginElement: ElementRef;
  @ViewChild('name') nameElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('movil') movilElement: ElementRef;
  @ViewChild('pass1') pass1Element: ElementRef;
  @ViewChild('pass2') pass2Element: ElementRef;

  switch = true;

  formRegister: FormGroup;
  formLogin: FormGroup;
  email: string;
  remember = false;

  auth2: any;

  constructor(
    public _userService: UserService,
    public router: Router,
    private renderer: Renderer2,
    private zone: NgZone
    ) { }

  checkPass(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        checkPass: true
      };
    };
  }

  ngOnInit(): void {
    this.googleInit();

    this.formRegister = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      movil: new FormControl(null, [Validators.required]),
      pass1: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required),
    }, { validators:  this.checkPass('pass1', 'pass2')} );

    this.formLogin = new FormGroup({
      loginEmail: new FormControl(null, [Validators.required, Validators.email]),
      loginPass: new FormControl(null, Validators.required),
      remember: new FormControl(false)
    });

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      setTimeout(() => {
        this.renderer.addClass(this.emailoginElement.nativeElement, 'active');
      }, 0);
      this.remember = true;
    }
    this.formLogin.setValue({
      loginEmail: this.email,
      loginPass: null,
      remember: this.remember
    });

    this.formRegister.setValue({
      name: 'Test1',
      email: 'test1@hcs.com',
      movil: '980958825',
      pass1: '123456',
      pass2: '123456'
    });

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '647932958847-nao2bk5jq56u1b98a7l16080uldkr25l.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token)
        .subscribe(ok => {
          this.zone.run(() =>
            this.router.navigate(['/home'])
          );
        });
      // this.router.navigate(['/home']));
      // console.log(token);
    });
  }

  registerUser() {
    if (this.formRegister.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return;
    }

    const user = new User(
      this.formRegister.value.name,
      this.formRegister.value.email,
      this.formRegister.value.pass1,
      this.formRegister.value.movil,
    );
    
    this._userService.createUser(user)
      // .subscribe(resp => this.switch = true);
      .subscribe(ok => {
        this.zone.run(() =>
          this.router.navigate(['/home'])
        );
      });
  }

  loginUser() {
    // console.log(this.formLogin.value);
    if (this.formRegister.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return;
    }

    const user = new User(
      null,
      this.formLogin.value.loginEmail,
      this.formLogin.value.loginPass,
    );

    this._userService.login(user, this.formLogin.value.remember)
      .subscribe(ok => {
        this.zone.run(() =>
          this.router.navigate(['/home'])
        );
      });

  }

  changeSwitch() {
    if (this.switch === false) {
      this.switch = true;
    } else {
      this.switch = false;
    }
  }

  textEffect(label: string) {
    // console.log(this.passloginElement.nativeElement.focus;
    
    // if (this.passloginElement.nativeElement.focus === true) {
    //   this.renderer.addClass(this.passloginElement.nativeElement, 'active');
    // }
    switch (label) {
      case 'emailogin':
        this.renderer.addClass(this.emailoginElement.nativeElement, 'active');
        break;
      case 'passlogin':
        this.renderer.addClass(this.passloginElement.nativeElement, 'active');
        break;
      case 'name':
        this.renderer.addClass(this.nameElement.nativeElement, 'active');
        break;
      case 'email':
        this.renderer.addClass(this.emailElement.nativeElement, 'active');
        break;
      case 'movil':
        this.renderer.addClass(this.movilElement.nativeElement, 'active');
        break;
      case 'pass1':
        this.renderer.addClass(this.pass1Element.nativeElement, 'active');
        break;
      case 'pass2':
        this.renderer.addClass(this.pass2Element.nativeElement, 'active');
        break;
      default:
        break;
    }
    this.renderer.addClass(this.emailoginElement.nativeElement, 'active');
  }

}
