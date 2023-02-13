import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { appRegex } from 'src/app/constants/constants';
import { Ingredient } from 'src/app/models/ingredients/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  getEmptyForm(): FormGroup {
    return new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, this.amountValidators()),
      'metricUnit': new FormControl(null, Validators.required),
    })
  }

  getForm(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      'id': new FormControl(ingredient.id),
      'name': new FormControl(ingredient.name, Validators.required),
      'amount': new FormControl(ingredient.amount, this.amountValidators()),
      'metricUnit': new FormControl(ingredient.metricUnit, Validators.required),
    })
  }

  private amountValidators() {
    return [
      Validators.required,
      Validators.pattern(appRegex.POSITIVE_NR)
    ];
  }

  getFormArray(ingredients: Ingredient[]): FormArray {
    let formArray = new FormArray([]);
    for (let ingredient of ingredients) {
      formArray.push(this.getForm(ingredient))
    };
    return formArray;
  }

}
