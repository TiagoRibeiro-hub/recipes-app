import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BaseModel } from 'src/app/models/baseModel';
import { FormControlService } from './form-control.service';

export class IFormArrays {
  name: string;
  array: FormArray;
};

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {
  formGroup: FormGroup;
  constructor(
    private formControlService: FormControlService
  ) { }

  getEmptyForm(model: BaseModel, formArrays: IFormArrays[] = undefined): FormGroup {
    return !!formArrays
      ? this.formWithFormArrays(model, formArrays, true)
      : this.simpleForm(model, true)
  }

  getForm(model: BaseModel, formArrays: IFormArrays[] = undefined): FormGroup {
    return !!formArrays
      ? this.formWithFormArrays(model, formArrays, false)
      : this.simpleForm(model, false)
  }

  private simpleForm(model: BaseModel, emptyModel: boolean): FormGroup {
    let formGroup = new FormGroup({});
    emptyModel
      ? Object.keys(model).forEach((key) => { this.formControlService.addControl(formGroup, key, null); })
      : Object.keys(model).forEach((key) => { this.formControlService.addControl(formGroup, key, model[key]); });

    return formGroup;
  }

  private formWithFormArrays(model: BaseModel, formArrays: IFormArrays[], emptyModel: boolean) {
    let formGroup = new FormGroup({});
    let isFormArray = false;
    Object.keys(model).forEach((key) => {
      formArrays.map((formArray) => {
        switch (formArray.name) {
          case key: {
            isFormArray = true;
            this.formControlService.addControlFormArray(formGroup, key, formArray.array);
            break;
          }
          default: break;
        };
      });
      if (!isFormArray) {
        this.formControlService.addControl(formGroup, key, (emptyModel ? null : model[key]))
      }
      else {
        isFormArray = false;
      }
    });

    return formGroup;
  }





}

