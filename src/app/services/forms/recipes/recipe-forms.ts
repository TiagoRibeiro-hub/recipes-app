import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { FormGroupService, IFormGroups,  } from 'src/app/services/forms/form-group.service';
import { IngredientForms } from '../ingredients/ingredient-forms';

export interface IRecipeForms {
  recipes: Recipe;
  iFormGroupsArray: IFormGroups[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeForms {

  constructor(
    private formGroupService: FormGroupService,
    private ingredientForm: IngredientForms
  ) { }

  getFormGroup(recipeForms: IRecipeForms = undefined): FormGroup {
    let formGroup = new FormGroup({});
    const formGroupsArray: IFormGroups[] = [];
    let formArrayIngr = {
      name: 'ingredients',
      formGroup: undefined
    }
    if (recipeForms === undefined) {
      formArrayIngr.formGroup = this.ingredientForm.getFormGroup();
      formGroupsArray.push(formArrayIngr);
      formGroup = this.formGroupService.getEmptyFormWithFormArrays(Recipe.empty(), formGroupsArray);
    }
    else {
      formGroup = this.formGroupService.getFormWithFormArrays(recipeForms.recipes, recipeForms.iFormGroupsArray);
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
