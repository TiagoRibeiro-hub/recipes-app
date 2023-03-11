import { inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "src/app/app-modules/recipes/recipe.model";
import { IngredientFormService } from "src/app/services/forms/ingredients/ingredient-form.service";
import { IRecipeForms, RecipeFormService } from "src/app/services/forms/recipes/recipe-form.service";
import { RecipeService } from "src/app/services/recipes/recipe.service";

export interface IRecipeEdit {
    editMode: boolean;
    get: Recipe,
    form: FormGroup
}

// @Injectable({
//     providedIn: 'root'
// })
// export class RecipeEditResolver implements Resolve<IRecipeEdit> {
//     constructor(
//         private recipeService: RecipeService,
//         private recipeFormService: RecipeFormService,
//         private ingredientFormService: IngredientFormService) { }

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IRecipeEdit | Observable<IRecipeEdit> | Promise<IRecipeEdit> {

//         const id = route.params['id'];
//         const editMode = id != undefined;

//         let recipeToEdit = editMode ? this.recipeService.getById(id) : undefined;
//         let form: FormGroup;

//         if (recipeToEdit === undefined) {
//             form = this.recipeFormService.getFormGroup();
//         }
//         else {
//             let iRecipeForms: IRecipeForms = {
//                 recipes: recipeToEdit,
//                 iFormGroupsArray: this.ingredientFormService.getFormArray(recipeToEdit.ingredients)
//             };
//             form = this.recipeFormService.getFormGroup(iRecipeForms);
//         }

//         return {
//             editMode: editMode,
//             get: recipeToEdit,
//             form: form
//         };
//     }
// }

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