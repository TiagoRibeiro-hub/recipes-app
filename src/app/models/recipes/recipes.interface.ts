import { FormGroup } from "@angular/forms";
import { Recipe } from "./recipe.model";

export interface IRecipeEdit {
    editMode: boolean;
    get: Recipe,
    form: FormGroup
}