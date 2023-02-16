import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  getFromFormGroup(form: FormGroup, formControlName: string): FormControl {
    return  (<FormControl>form.get(formControlName));
  }

  getFromFormArray(form: FormArray, formControlName: string, index: number): FormControl {
    return  (<FormControl>form.controls[index].get(formControlName));
  }

  addControl(formGroup: FormGroup, key: string, value: any): void{
    formGroup.addControl(key, new FormControl(value));
  }

  addControlFormArray(formGroup: FormGroup, key: string, value: FormGroup): void{
    formGroup.addControl(key, new FormArray([value]));
  }
}
