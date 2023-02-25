import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthFirebaseResponse, AuthFirebaseService } from 'src/app/services/firebase/auth/auth.firebase.service';
import { AuthFormService } from 'src/app/services/forms/auth/auth-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
    private toastr: ToastrService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getFormGroup();
  }


  onSwitchMode(): void {
    this.isLogin = !this.isLogin;
    this.getFormGroup();
  }

  onSubmit(): void {
    this.loader.set();

    let authObs: Observable<AuthFirebaseResponse> = !this.isLogin ? this.signUp() : this.login();

    authObs.subscribe({
      next: (response: AuthFirebaseResponse) => console.log(response),
      error: (error: Error) => {
        this.toastr.error(error.message, '', { positionClass: 'toast-top-center' });
      },
    })

    this.loader.unSet();
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

  private signUp(): Observable<AuthFirebaseResponse> {
    return this.authFirebaseService.signUp(this.authForm.value);
  }

  private login(): Observable<AuthFirebaseResponse> {
    return this.authFirebaseService.signIn(this.authForm.value);
  }
}
