import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "@models/recipes/recipe.model";
import { RecipeService } from "@services/recipes/recipe.service";


export const RecipeDetailResolver: ResolveFn<Recipe> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(RecipeService).getById(route.params['id']);
    }
