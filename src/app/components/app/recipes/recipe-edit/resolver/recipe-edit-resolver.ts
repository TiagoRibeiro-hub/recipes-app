import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/models/recipes/recipe.model";
import { IngredientFormService } from "src/app/services/forms/ingredients/ingredient-form.service";
import { IRecipeForms, RecipeFormService } from "src/app/services/forms/recipes/recipe-form.service";
import { RecipeService } from "src/app/services/recipes/recipe.service";

export interface IRecipeEdit {
    editMode: boolean;
    get: Recipe,
    form: FormGroup
}

@Injectable({
    providedIn: 'root'
})
export class RecipeEditResolver implements Resolve<IRecipeEdit> {
    constructor(
        private recipeService: RecipeService,
        private recipeFormService: RecipeFormService,
        private ingredientFormService: IngredientFormService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IRecipeEdit | Observable<IRecipeEdit> | Promise<IRecipeEdit> {

        const id = route.params['id'];
        const editMode = id != undefined;

        let recipeToEdit = editMode ? this.recipeService.getById(id) : undefined;
        let form: FormGroup;

        if (recipeToEdit === undefined) {
            form = this.recipeFormService.getFormGroup();
        }
        else {
            let iRecipeForms: IRecipeForms = {
                recipes: recipeToEdit,
                iFormGroupsArray: this.ingredientFormService.getFormArray(recipeToEdit.ingredients)
            };
            form = this.recipeFormService.getFormGroup(iRecipeForms);
        }

        return {
            editMode: editMode,
            get: recipeToEdit,
            form: form
        };
    }

}