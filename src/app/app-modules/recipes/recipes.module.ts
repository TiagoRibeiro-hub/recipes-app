import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "@app-modules/auth/guards/auth.guard";
import { appRoute } from "@constants/routes";
import { recipesGuard } from "./guards/recipes.guard";
import { RecipeDetailResolver } from "./recipe-detail/resolver/recipe-detail-resolver";
import { RecipeEditResolver } from "./recipe-edit/resolver/recipe-edit-resolver";
import { IngredientsListComponent } from "../shared/components/ingredients-list/ingredients-list.component";

const recipeRoutes: Routes = [
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

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(recipeRoutes),
        SharedModule,
        IngredientsListComponent
    ]
})
export class RecipesModule { }