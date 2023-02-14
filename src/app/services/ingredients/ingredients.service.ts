import { Injectable } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { appRegex } from 'src/app/constants/constants';
import { Ingredient } from 'src/app/models/ingredients/ingredient.model';
import { IFormArrays } from '../forms/form-group.service';
import { FormsService } from '../forms/forms.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(
    private formsService: FormsService
  ) { }

  getEmptyForm(): FormGroup {
    let formGroup = this.formsService.getEmptyForm(Ingredient.empty());
    this.setValidators(formGroup);
    return formGroup;
  }

  getForm(ingredient: Ingredient): FormGroup {
    let formGroup = this.formsService.getForm(ingredient);
    // validators
    return formGroup;
  }

  getEmptyFormArray(): FormArray {
    //return new FormArray([this.getEmptyForm()], Validators.required)
    return new FormArray([this.getEmptyForm()])
  }

  getFormArray(ingredients: Ingredient[]): FormArray {
    let formArray = new FormArray([]);
    for (let ingredient of ingredients) {
      formArray.push(this.getForm(ingredient));
    };
    return formArray;
  }

  getIFormArrays(ingredients: Ingredient[]): IFormArrays {
    return ingredients.length == 0
      ? {
        name: 'ingredients',
        array: this.getEmptyFormArray()
      } 
      : {
        name: 'ingredients',
        array: this.getFormArray(ingredients)
      };
  }

  private setValidators(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (key) {
        case 'name': 
          formGroup.controls[key].addValidators(Validators.required);
          break;
        case 'amount': 
        formGroup.controls[key].addValidators(this.amountValidators());
          break;
        case 'metricUnit': 
        formGroup.controls[key].addValidators(Validators.required);
          break;
      }
    });
  }

  private amountValidators() {
    return [
      Validators.required,
      Validators.pattern(appRegex.POSITIVE_NR)
    ];
  }

}
