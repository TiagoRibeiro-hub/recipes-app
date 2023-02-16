import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/models/recipes/recipe.model";
import { IngredientForms } from "src/app/services/forms/ingredients/ingredient-forms";
import { IRecipeForms, RecipeForms } from "src/app/services/forms/recipes/recipe-forms";
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
        private recipeForms: RecipeForms,
        private ingredientForms: IngredientForms) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeEdit | Observable<RecipeEdit> | Promise<RecipeEdit> {
        const id = route.params['id'];
        const editMode = id != undefined;

        let recipeToEdit = editMode ? this.recipeService.getById(id) : undefined;
        let form: FormGroup;

        if (recipeToEdit === undefined) {
            form = this.recipeForms.getFormGroup();
        }
        else {
            let iRecipeForms: IRecipeForms = {
                recipes: recipeToEdit,
                iFormGroupsArray: this.ingredientForms.getFormArray(recipeToEdit.ingredients)
            };
            form = this.recipeForms.getFormGroup(iRecipeForms);
        }

        return {
            editMode: editMode,
            get: recipeToEdit,
            form: form
        };
    }

}