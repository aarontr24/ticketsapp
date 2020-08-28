import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  formUpdate: FormGroup;

  constructor(
    public _userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.user = this._userService.user;
    this.Init();
  }

  Init() {
    this.formUpdate = this.fb.group(
      {
        name: [this.user.name, [Validators.required]],
        email: [{value: this.user.email, disabled: this.user.google}, [Validators.required, Validators.email]],
        movil: [this.user.movil, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]]
      }
    );
  }

  updateUser() {
    // console.log(this.formUpdate);

    const user = new User(
      this.formUpdate.value.name,
      this.formUpdate.value.email,
      '',
      this.formUpdate.value.movil
    );

    this._userService.updateUser(user)
      .subscribe(ok => true);
  }

}
