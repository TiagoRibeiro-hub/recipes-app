import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormArrayService {
  constructor() {}

  getFormArray(form: FormGroup, formArrayName: string): FormArray {
    return <FormArray>form.get(formArrayName);
  }

  clearFormArray(form: FormGroup, formArrayName: string): void {
    (<FormArray>form.get(formArrayName)).clear();
  }
}
