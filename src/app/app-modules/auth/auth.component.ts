import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthFirebaseService, AuthFirebaseResponse } from "@services/auth/firebase/auth.firebase.service";
import { AuthFormService } from "@services/forms/auth/auth-form.service";
import { NavigationService } from "@services/navigation/navigation.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";


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
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.getFormGroup();
  }


  onSwitchMode(): void {
    this.isLogin = !this.isLogin;
    this.getFormGroup();
  }

  onSubmit(): void {
    let authObs: Observable<AuthFirebaseResponse> = !this.isLogin ? this.signUp() : this.login();

    authObs.subscribe({
      next: () => this.navigation.toRecipes(),
      error: (error: Error) => {
        this.toastr.error(error.message, '', { positionClass: 'toast-top-center' });
      },
    })
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
