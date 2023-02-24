import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { appRegex } from 'src/app/constants/constants';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { IFormsGroups } from 'src/app/models/auth/interfaces';
import { FormGroupService } from '../form-group.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFormService implements IFormsGroups<AuthModel> {

  isLogin: boolean = false;

  constructor(
    private formGroupService: FormGroupService
  ) { }

  getFormGroup(authModel: AuthModel = undefined): FormGroup {
    let formGroup = new FormGroup({});

    formGroup = authModel === undefined
      ? this.formGroupService.getEmptyForm(AuthModel.empty())
      : this.formGroupService.getForm(authModel);

    this.setValidators(formGroup);
    return formGroup;
  }

  getFormGroupLogin(authModel: AuthModel = undefined): FormGroup {
    let formGroup = new FormGroup({});

    formGroup = authModel === undefined
      ? this.formGroupService.getEmptyForm(AuthModel.empty())
      : this.formGroupService.getForm(authModel);

    this.isLogin = true;
    this.setValidators(formGroup);
    return formGroup;
  }

  setValidators(formGroup: FormGroup): void {
    let validators: ValidatorFn[];
    
    Object.keys(formGroup.controls).forEach((key) => {
      switch (key) {
        case 'email':
          formGroup.controls[key].addValidators([
            Validators.required,
            Validators.email
          ]);
          break;
        case 'username':
          validators = [];
          if(!this.isLogin){
            validators = [
              Validators.required,
              Validators.pattern(appRegex.USERNAME) // todo
            ]
          }
          formGroup.controls[key].addValidators(validators);
          break;
        case 'password':
          formGroup.controls[key].addValidators([
            Validators.required,
            Validators.pattern(appRegex.PASSWORD) // todo
          ]);
          break;
        case 'confirmPassword':
          validators = [];
          if (!this.isLogin) {
            validators = [
              Validators.required,
              Validators.pattern(appRegex.PASSWORD) // todo
            ]
          }
          formGroup.controls[key].addValidators(validators);
          break;
      }
    });
  }
}
