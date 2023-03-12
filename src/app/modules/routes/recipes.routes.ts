import { Routes } from '@angular/router';
import { authGuard } from '@components/auth/guards/auth.guard';
import { recipesGuard } from '@components/recipes/guards/recipes.guard';
import { RecipeDetailResolver } from '@components/recipes/recipe-detail/resolver/recipe-detail-resolver';
import { RecipeEditResolver } from '@components/recipes/recipe-edit/resolver/recipe-edit-resolver';
import { appRoute } from '@constants/routes';



export const RECIPES_ROUTES: Routes = [
    {
        path: '',
        canActivate: [async () => await authGuard()],
        loadComponent: () => import('@components/recipes/recipes.component').then(c => c.RecipesComponent),
        children: [
            {
                path: '', 
                loadComponent: () => import('@components/recipes/recipe-start/recipe-start.component').then(c => c.RecipeStartComponent),
            },
            {
                path: appRoute.NEW,
                resolve: {
                    recipeEdit: RecipeEditResolver
                },
                loadComponent: () => import('@components/recipes/recipe-edit/recipe-edit.component').then(c => c.RecipeEditComponent)
            },
            {
                path: ':id',
                canActivate: [async () => await recipesGuard()],
                resolve: {
                    recipeDetail: RecipeDetailResolver
                },
                loadComponent: () => import('@components/recipes/recipe-detail/recipe-detail.component').then(c => c.RecipeDetailComponent)
            },
            {
                path: ':id/' + appRoute.EDIT,
                canActivate: [async () => await recipesGuard()],
                resolve: {
                    recipeEdit: RecipeEditResolver
                },
                loadComponent: () => import('@components/recipes/recipe-edit/recipe-edit.component').then(c => c.RecipeEditComponent)
            },
        ]
    }
];
