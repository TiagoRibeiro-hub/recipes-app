import { Routes } from "@angular/router";
import { authGuard } from "@app-modules/auth/guards/auth.guard";
import { appRoute } from "@constants/routes";
import { recipesGuard } from "../recipes/guards/recipes.guard";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeDetailResolver } from "../recipes/recipe-detail/resolver/recipe-detail-resolver";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";
import { RecipeEditResolver } from "../recipes/recipe-edit/resolver/recipe-edit-resolver";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "../recipes/recipes.component";

export const RECIPES_ROUTES: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [async () => await authGuard()],
        children: [
            {
                path: '', component: RecipeStartComponent
            },
            {
                path: appRoute.NEW, component: RecipeEditComponent,
                resolve: {
                    recipeEdit: RecipeEditResolver
                }
            },
            {
                path: ':id', component: RecipeDetailComponent,
                canActivate: [async () => await recipesGuard()],
                resolve: {
                    recipeDetail: RecipeDetailResolver
                }
            },
            {
                path: ':id/' + appRoute.EDIT, component: RecipeEditComponent,
                canActivate: [async () => await recipesGuard()],
                resolve: {
                    recipeEdit: RecipeEditResolver
                }
            },
        ]
    }
];
