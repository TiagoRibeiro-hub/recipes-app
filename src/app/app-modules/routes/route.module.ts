import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@app-modules/auth/auth.component';
import { authGuard } from '@app-modules/auth/guards/auth.guard';
import { NotAuthorizedComponent } from '@app-modules/auth/status/not-authorized/not-authorized.component';
import { NotFoundComponent } from '@app-modules/auth/status/not-found/not-found.component';
import { recipesGuard } from '@app-modules/recipes/guards/recipes.guard';
import { RecipeDetailComponent } from '@app-modules/recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from '@app-modules/recipes/recipe-detail/resolver/recipe-detail-resolver';
import { RecipeEditComponent } from '@app-modules/recipes/recipe-edit/recipe-edit.component';
import { RecipeEditResolver } from '@app-modules/recipes/recipe-edit/resolver/recipe-edit-resolver';
import { RecipeStartComponent } from '@app-modules/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '@app-modules/recipes/recipes.component';
import { ShoppingListComponent } from '@app-modules/shopping-list/shopping-list.component';
import { appRoute } from '@constants/routes';



//https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
// RECIPES
const recipeRoutes = {
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
  };
// // INGREDIENT LIST
// const ingredientsRoutes = {
//   path: appRoute.INGREDIENTS, 
//   component: IngredientListComponent,
//   canActivate: [async () => await authGuard()],
// };
// SHOPPING LIST
const shoppingListRoutes = {
  path: appRoute.SHOPPING_LIST, component: ShoppingListComponent
};
  // AUTH 
const authRoutes = {
  path: appRoute.AUTH, component: AuthComponent,
}
const statusRoutes = [  
  {
    path: appRoute.NOT_AUTHORIZED, component: NotAuthorizedComponent
  },
  {
    path: appRoute.NOT_FOUND, component: NotFoundComponent
  },
]
// APP ROUTES
let appRoutes : Routes = [
  {path: '', redirectTo: '/' + appRoute.RECIPES, pathMatch: 'full'},

];
appRoutes.push(
  recipeRoutes, 
  shoppingListRoutes,
  authRoutes,
  ...statusRoutes,
  {path: '**', redirectTo: '/' + appRoute.NOT_FOUND}
  );

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class RouteModule { }
