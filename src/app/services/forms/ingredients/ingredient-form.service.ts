import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { appRegex } from 'src/app/constants/constants';
import { IFormArraysGroups, IFormGroups, IFormsGroups } from 'src/app/models/forms/forms.interface';
import { FormGroupService } from 'src/app/services/forms/form-group.service';
import { Ingredient } from '../../../models/ingredients/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class IngredientFormService implements IFormsGroups<Ingredient>, IFormArraysGroups<Ingredient> {

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

  getFormArray(ingredients: Ingredient[] = undefined): IFormGroups[] {
    const formGroupsArray: IFormGroups[] = [];

    if(ingredients === undefined || ingredients.length === 0) {
      formGroupsArray.push({
        name: 'ingredients',
        formGroup: this.getFormGroup()
      });
    }
    else {
      for (let ingredient of ingredients) {
        let formArrayIngr = {
          name: 'ingredients',
          formGroup: this.getFormGroup(ingredient)
        }
        formGroupsArray.push(formArrayIngr);
      };
    }

    return formGroupsArray;
  }
  
  setValidators(formGroup: FormGroup): void {
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

