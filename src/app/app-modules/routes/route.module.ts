import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoute } from 'src/app/constants/routes';
import { AuthComponent } from '../auth/auth.component';
import { authGuard } from '../auth/guards/auth.guard';
import { NotAuthorizedComponent } from '../auth/status/not-authorized/not-authorized.component';
import { NotFoundComponent } from '../auth/status/not-found/not-found.component';
import { recipesGuard } from '../recipes/guards/recipes.guard';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from '../recipes/recipe-detail/resolver/recipe-detail-resolver';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeEditResolver } from '../recipes/recipe-edit/resolver/recipe-edit-resolver';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';


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
