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
        canActivate: [async () => await authGuard()],
        loadComponent: () => import('../recipes/recipes.component').then(c => c.RecipesComponent),
        children: [
            {
                path: '', 
                loadComponent: () => import('../recipes/recipe-start/recipe-start.component').then(c => c.RecipeStartComponent),
            },
            {
                path: appRoute.NEW,
                resolve: {
                    recipeEdit: RecipeEditResolver
                },
                loadComponent: () => import('../recipes/recipe-edit/recipe-edit.component').then(c => c.RecipeEditComponent)
            },
            {
                path: ':id', component: RecipeDetailComponent,
                canActivate: [async () => await recipesGuard()],
                resolve: {
                    recipeDetail: RecipeDetailResolver
                },
                loadComponent: () => import('../recipes/recipe-detail/recipe-detail.component').then(c => c.RecipeDetailComponent)
            },
            {
                path: ':id/' + appRoute.EDIT,
                canActivate: [async () => await recipesGuard()],
                resolve: {
                    recipeEdit: RecipeEditResolver
                },
                loadComponent: () => import('../recipes/recipe-edit/recipe-edit.component').then(c => c.RecipeEditComponent)
            },
        ]
    }
];
