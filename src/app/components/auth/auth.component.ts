import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthFirebaseResponse, AuthFirebaseService } from 'src/app/services/firebase/auth/auth.firebase.service';
import { AuthFormService } from 'src/app/services/forms/auth/auth-form.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  isLogin: boolean = true;

  constructor(
    private authFormService: AuthFormService,
    private authFirebaseService: AuthFirebaseService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFormGroup();
  }


  onSwitchMode(): void {
    this.isLogin = !this.isLogin;
    this.getFormGroup();
  }

  onSubmit(): void {
    !this.isLogin ? this.signUp() : this.login();

    this.authForm.reset();
  }

  showPattern(): void {
    this.toastr.info(
      'At least 3 upper and 3 lower letters, 2 digits and 2 of \|!@#$%{[(=+-)]}_&*',
      '',
      {
        disableTimeOut: true,
        positionClass: 'toast-top-center'
      }
    )
  }

  private getFormGroup() {
    this.authForm = !this.isLogin
      ? this.authFormService.getFormGroup()
      : this.authFormService.getFormGroupLogin();
  }

  private signUp() {
    this.authFirebaseService.signUp(this.authForm.value).subscribe((response: AuthFirebaseResponse) => {
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

  private login() {

  }
}
