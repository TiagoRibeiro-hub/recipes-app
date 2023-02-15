import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseModel } from 'src/app/models/baseModel';
import { FormArrayService } from './form-array.service';
import { FormControlService } from './form-control.service';
import { IFormArrays, FormGroupService } from './form-group.service';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(
    private formArrayService: FormArrayService,
    private formGroupService: FormGroupService,
    private formControlService: FormControlService
  ) { }

  // FORM GROUPS
  getEmptyForm(model: BaseModel, formArrays: IFormArrays[] = undefined): FormGroup {
    return this.formGroupService.getEmptyForm(model, formArrays);
  }

  getForm(model: BaseModel, formArrays: IFormArrays[] = undefined): FormGroup {
    return this.formGroupService.getForm(model, formArrays);
  }
  // FORM ARRAY
  getFormArray(form: FormGroup, formArrayName: string): FormArray {
    return this.formArrayService.getFormArray(form, formArrayName);
  }

  clearFormArray(form: FormGroup, formArrayName: string): void {
    this.formArrayService.clearFormArray(form, formArrayName);
  }
  // CONTROLS
  getFormControlFromFormGroup(form: FormGroup, formControlName: string): FormControl {
    return this.formControlService.getFromFormGroup(form, formControlName);
  }

  getFormControlFromFormArray(form: FormArray, formControlName: string, index: number): FormControl {
    return this.formControlService.getFromFormArray(form, formControlName, index);
  }

}
