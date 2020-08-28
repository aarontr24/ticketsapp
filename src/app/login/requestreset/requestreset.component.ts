import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestreset',
  templateUrl: './requestreset.component.html',
  styleUrls: ['./requestreset.component.css']
})
export class RequestresetComponent implements OnInit {

  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;

  constructor(
    public _userService: UserService,
    public router: Router,
   ) { }

  ngOnInit() {
    this.RequestResetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  RequestResetUser(form) {
    console.log(form);
    if (form.valid) {
      this.IsvalidForm = true;
      this._userService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/login']);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }

}
