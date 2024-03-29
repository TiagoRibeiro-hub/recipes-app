import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@modules/shared/shared.module";
import { AuthFirebaseService, IAuthFirebaseResponse } from "@services/auth/firebase/auth.firebase.service";
import { AuthFormService } from "@services/forms/auth/auth-form.service";
import { NavigationService } from "@services/navigation/navigation.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";


@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
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
    let authObs: Observable<IAuthFirebaseResponse> = !this.isLogin ? this.signUp() : this.login();

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
        positionClass: 'toast-top-center',
        timeOut: 15000
      }
    )
  }

  private getFormGroup() {
    this.authForm = !this.isLogin
      ? this.authFormService.getFormGroup()
      : this.authFormService.getFormGroupLogin();
  }

  private signUp(): Observable<IAuthFirebaseResponse> {
    return this.authFirebaseService.signUp(this.authForm.value);
  }

  private login(): Observable<IAuthFirebaseResponse> {
    return this.authFirebaseService.signIn(this.authForm.value);
  }
}
