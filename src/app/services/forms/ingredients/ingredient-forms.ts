import { Injectable } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { appRegex } from 'src/app/constants/constants';
import { FormGroupService } from 'src/app/services/forms/form-group.service';
import { Ingredient } from '../../../models/ingredients/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class IngredientForms {

  constructor(
    private formGroupService: FormGroupService
  ) { }

  getFormGroup(ingredient: Ingredient = undefined): FormGroup {
    let formGroup = new FormGroup({});

    formGroup = ingredient === undefined
      ? this.formGroupService.getEmptyForm(Ingredient.empty())
      : this.formGroupService.getForm(ingredient);

    this.setValidators(formGroup);
    return formGroup;
  }

  getFormArray(ingredients: Ingredient[]): FormArray {
    let formArray = new FormArray([]);
    for (let ingredient of ingredients) {
      formArray.push(this.getFormGroup(ingredient));
    };
    return formArray;
  }
  
  private setValidators(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (key) {
        case 'name':
          formGroup.controls[key].addValidators(Validators.required);
          break;
        case 'amount':
          formGroup.controls[key].addValidators([
            Validators.required,
            Validators.pattern(appRegex.POSITIVE_NR)
          ]);
          break;
        case 'metricUnit':
          formGroup.controls[key].addValidators(Validators.required);
          break;
      }
    });
  }
}

