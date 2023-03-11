import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { appRegex } from 'src/app/constants/constants';
import { IFormsGroups } from 'src/app/models/forms/forms.interface';
import { FormGroupService } from '../form-group.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFormService implements IFormsGroups<AuthModel> {

  isLogin: boolean;

  constructor(
    private formGroupService: FormGroupService
  ) { }

  getFormGroup(authModel: AuthModel = undefined): FormGroup {
    this.isLogin = false;
    let formGroup = this.getForm(authModel);
    formGroup.setValidators(this.confirmPassword);
    return formGroup;
  }

  getFormGroupLogin(authModel: AuthModel = undefined): FormGroup {
    this.isLogin = true;
    const formGroup = this.getForm(authModel);
    return formGroup;
  }

  private getForm(authModel: AuthModel) {
    let formGroup = new FormGroup({});

    formGroup = authModel === undefined
      ? this.formGroupService.getEmptyForm(AuthModel.empty())
      : this.formGroupService.getForm(authModel);

    this.setValidators(formGroup);
    return formGroup;
  }

  private confirmPassword(formGroup: FormGroup): ValidatorFn | ValidatorFn[] {
      const passwordControl = formGroup.controls['password'];
      const confirmPasswordControl = formGroup.controls['confirmPassword'];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
  }


  setValidators(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (key) {
        case 'email':
          formGroup.controls[key].addValidators([
            Validators.required,
            Validators.email
          ]);
          break;
        case 'username':
          if (!this.isLogin) {
            formGroup.controls[key].addValidators(regexValidators(appRegex.USERNAME));
          }
          break;
        case 'password':
          formGroup.controls[key].addValidators(regexValidators(appRegex.PASSWORD));
          break;
        case 'confirmPassword':
          if (!this.isLogin) {
            formGroup.controls[key].addValidators(regexValidators(appRegex.PASSWORD));
          }
          break;
      };

      function regexValidators(pattern: RegExp): ValidatorFn | ValidatorFn[] {
        return [
          Validators.required,
          Validators.pattern(pattern)
        ];
      }
    });
  }
}
