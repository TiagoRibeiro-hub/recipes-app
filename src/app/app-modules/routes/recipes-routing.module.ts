import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "@app-modules/auth/guards/auth.guard";
import { recipesGuard } from "@app-modules/recipes/guards/recipes.guard";
import { RecipeDetailComponent } from "@app-modules/recipes/recipe-detail/recipe-detail.component";
import { RecipeDetailResolver } from "@app-modules/recipes/recipe-detail/resolver/recipe-detail-resolver";
import { RecipeEditComponent } from "@app-modules/recipes/recipe-edit/recipe-edit.component";
import { RecipeEditResolver } from "@app-modules/recipes/recipe-edit/resolver/recipe-edit-resolver";
import { RecipeStartComponent } from "@app-modules/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "@app-modules/recipes/recipes.component";
import { appRoute } from "@constants/routes";

const recipeRoutes: Routes = [
    {
        path: appRoute.RECIPES,
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

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class RecipesRoutingModule { }