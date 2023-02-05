import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/models/recipes/recipe.model";
import { RecipeService } from "src/app/services/recipes/recipe.service";

@Injectable({
    providedIn: 'root'
  })
export class RecipeDetailResolver implements Resolve<Recipe> {

    constructor(private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return this.recipeService.getRecipeById(route.params['id']);
    }

}