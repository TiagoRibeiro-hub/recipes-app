import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormArrayService {
  constructor() {}

  getFormArray(form: FormGroup): FormArray {
    return <FormArray>form.get('ingredients');
  }

  clearFormArray(form: FormGroup, formArrayName: string): void {
    (<FormArray>form.get(formArrayName)).clear();
  }
}
