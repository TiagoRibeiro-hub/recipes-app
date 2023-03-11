import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "@models/recipes/recipe.model";
import { RecipeService } from "@services/recipes/recipe.service";


// @Injectable({
//     providedIn: 'root'
//   })
// export class RecipeDetailResolver implements Resolve<Recipe> {

//     constructor(private recipeService: RecipeService) { }

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
//         return this.recipeService.getById(route.params['id']);
//     }

// }

export const RecipeDetailResolver: ResolveFn<Recipe> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(RecipeService).getById(route.params['id']);
    }
