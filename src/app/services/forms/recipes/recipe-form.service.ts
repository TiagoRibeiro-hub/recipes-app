import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { IFormGroups, IFormsGroups } from "@models/forms/forms.interface";
import { Recipe } from "@models/recipes/recipe.model";
import { FormGroupService } from "../form-group.service";
import { IngredientFormService } from "../ingredients/ingredient-form.service";

export interface IRecipeForms {
  recipes: Recipe;
  iFormGroupsArray: IFormGroups[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService implements IFormsGroups<IRecipeForms> {

  constructor(
    private formGroupService: FormGroupService,
    private ingredientFormService: IngredientFormService
  ) { 

  }

  getFormGroup(recipeForms: IRecipeForms = undefined): FormGroup {
    let formGroup = new FormGroup({});
    const formGroupsArray: IFormGroups[] = [];
    let formArrayIngr = {
      name: 'ingredients',
      formGroup: undefined
    }
    if (recipeForms === undefined) {
      formArrayIngr.formGroup = this.ingredientFormService.getFormGroup();
      formGroupsArray.push(formArrayIngr);
      formGroup = this.formGroupService.getEmptyFormWithFormArrays(Recipe.empty(), formGroupsArray);
    }
    else {
      formGroup = this.formGroupService.getFormWithFormArrays(recipeForms.recipes, recipeForms.iFormGroupsArray);
    }
    this.setValidators(formGroup);
    return formGroup;
  }

  
  setValidators(formGroup: FormGroup): void {
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
