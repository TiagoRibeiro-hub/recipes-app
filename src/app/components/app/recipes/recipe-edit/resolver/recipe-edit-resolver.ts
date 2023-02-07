import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/models/recipes/recipe.model";
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
    recipeToEdit: Recipe;
    editMode: boolean = false;

    constructor(
        private recipeService: RecipeService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeEdit | Observable<RecipeEdit> | Promise<RecipeEdit> {
        const id = route.params['id'];
        this.editMode = id !== null || id !== undefined;
        if(this.editMode) {
            this.recipeToEdit = this.recipeService.getRecipeById(id);
        };
        return {
            editMode: this.editMode,
            get: this.recipeToEdit,
            form: this.initForm()
        };        
    }

    private initForm(): FormGroup {

        let recipeId = "";
        let recipeName = "";
        let recipeDescription = "";
        let recipeImagePath = "";
        let recipeingredients = [];
    
        if(this.editMode){
          recipeId = this.recipeToEdit.id;
          recipeName = this.recipeToEdit.name;
          recipeDescription = this.recipeToEdit.description;
          recipeImagePath = this.recipeToEdit.imagePath;
          recipeingredients = this.recipeToEdit.ingredients;
        }
    
        return new FormGroup({
          'id': new FormControl(recipeId),
          'name': new FormControl(recipeName),
          'description': new FormControl(recipeDescription),
          'imagePath': new FormControl(recipeImagePath) 
        });
      }

}