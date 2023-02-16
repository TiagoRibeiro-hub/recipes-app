import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseModel } from 'src/app/models/baseModel';
import { FormControlService } from './form-control.service';

export class IFormGroupArrays {
  name: string;
  formGroup: FormGroup;
};

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {
  formGroup: FormGroup;
  constructor(
    private formControlService: FormControlService
  ) { }

  getEmptyForm(model: BaseModel): FormGroup {
    return this.simpleForm(model, true) 
  }

  getForm(model: BaseModel): FormGroup {
    return this.simpleForm(model, false)
  }

  getEmptyFormWithFormArrays(model: BaseModel, formGroupArrays: IFormGroupArrays[]): FormGroup {
    if(formGroupArrays.length > 0) {
      return this.formWithFormArrays(model, formGroupArrays, true);
    }
  }

  getFormWithFormArrays(model: BaseModel, formGroupArrays: IFormGroupArrays[]): FormGroup {
    if(formGroupArrays.length > 0) {
      return this.formWithFormArrays(model, formGroupArrays, false);
    }
  }

  private simpleForm(model: BaseModel, emptyModel: boolean): FormGroup {
    let formGroup = new FormGroup({});
    emptyModel
      ? Object.keys(model).forEach((key) => { this.formControlService.addControl(formGroup, key, null); })
      : Object.keys(model).forEach((key) => { this.formControlService.addControl(formGroup, key, model[key]); });

    return formGroup;
  }

  private formWithFormArrays(model: BaseModel, formGroupArrays: IFormGroupArrays[], emptyModel: boolean) {
    let formGroup = new FormGroup({});
    let isFormArray = false;
    Object.keys(model).forEach((key) => {
      formGroupArrays.map((formGroupArray) => {
        switch (formGroupArray.name) {
          case key: {
            isFormArray = true;
            this.formControlService.addControlFormArray(formGroup, key, formGroupArray.formGroup);
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

