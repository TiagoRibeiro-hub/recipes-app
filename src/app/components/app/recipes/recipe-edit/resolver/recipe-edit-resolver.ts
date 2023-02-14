import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/models/recipes/recipe.model";
import { IFormArrays } from "src/app/services/forms/form-group.service";
import { IngredientsService } from "src/app/services/ingredients/ingredients.service";
import { RecipeService } from "src/app/services/recipes/recipe.service";

export interface RecipeEdit {
    editMode: boolean;
    get: Recipe,
    form: FormGroup
}

@Injectable({
    providedIn: 'root'
  })
export class RecipeEditResolver implements Resolve<RecipeEdit> {
      constructor(
        private recipeService: RecipeService,
        private ingredientsService: IngredientsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeEdit | Observable<RecipeEdit> | Promise<RecipeEdit> {
        const id = route.params['id'];
        const editMode = id != undefined;

        let recipeToEdit = editMode ? this.recipeService.getById(id) : undefined;
        let form: FormGroup;

        if(recipeToEdit === undefined) {
            form = this.recipeService.getEmptyForm();
        }
        else {
            let formArray: IFormArrays[] = [];
            if (recipeToEdit['ingredients']) {
                formArray.push(this.ingredientsService.getIFormArrays(recipeToEdit.ingredients));
            }
            form = this.recipeService.getForm(recipeToEdit, formArray);
        }

        return {
            editMode: editMode,
            get: recipeToEdit,
            form: form 
        };        
    }

}