import { inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "@models/recipes/recipe.model";
import { IRecipeEdit } from "@models/recipes/recipes.interface";
import { IngredientFormService } from "@services/forms/ingredients/ingredient-form.service";
import { RecipeFormService, IRecipeForms } from "@services/forms/recipes/recipe-form.service";
import { RecipeService } from "@services/recipes/recipe.service";

export const RecipeDetailResolver: ResolveFn<Recipe> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(RecipeService).getById(route.params['id']);
    }

export const RecipeEditResolver: ResolveFn<IRecipeEdit> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

        const id = route.params['id'];
        const editMode = id != undefined;

        let recipeToEdit = editMode ? inject(RecipeService).getById(id) : undefined;
        let form: FormGroup;

        const recipeFormService = inject(RecipeFormService);
        if (recipeToEdit === undefined) {
            form = recipeFormService.getFormGroup();
        }
        else {
            let iRecipeForms: IRecipeForms = {
                recipes: recipeToEdit,
                iFormGroupsArray: inject(IngredientFormService).getFormArray(recipeToEdit.ingredients)
            };
            form = recipeFormService.getFormGroup(iRecipeForms);
        }

        return {
            editMode: editMode,
            get: recipeToEdit,
            form: form
        };
    }