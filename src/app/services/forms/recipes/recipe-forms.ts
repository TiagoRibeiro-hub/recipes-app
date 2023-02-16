import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { FormGroupService, IFormGroupArrays,  } from 'src/app/services/forms/form-group.service';
import { IngredientForms } from '../ingredients/ingredient-forms';

export interface RecipeForms {
  recipes: Recipe;
  iFormGroupArrays: IFormGroupArrays[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeForms {

  constructor(
    private formGroupService: FormGroupService,
    private ingredientForm: IngredientForms
  ) { }

  getFormGroup(recipeForms: RecipeForms = undefined): FormGroup {
    let formGroup = new FormGroup({});
    const formArrays: IFormGroupArrays[] = [];
    let formArrayIngr = {
      name: 'ingredients',
      formGroup: undefined
    }
    if (recipeForms === undefined) {
      formArrayIngr.formGroup = this.ingredientForm.getFormGroup();
      formArrays.push(formArrayIngr);
      formGroup = this.formGroupService.getEmptyFormWithFormArrays(Recipe.empty(), formArrays);
    }
    else {
      formGroup = this.formGroupService.getFormWithFormArrays(recipeForms.recipes, recipeForms.iFormGroupArrays);
    }
    this.setValidators(formGroup);
    return formGroup;
  }

  
  private setValidators(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (key) {
        case 'name': 
          formGroup.controls[key].addValidators(Validators.required);
          break;
        case 'description': 
        formGroup.controls[key].addValidators(Validators.required);
          break;
      }
    });
  }
}
