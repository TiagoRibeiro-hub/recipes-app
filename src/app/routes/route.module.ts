import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from '../components/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from '../components/app/recipes/recipe-detail/resolver/recipe-detail-resolver';
import { RecipeEditComponent } from '../components/app/recipes/recipe-edit/recipe-edit.component';
import { RecipeEditResolver } from '../components/app/recipes/recipe-edit/resolver/recipe-edit-resolver';
import { RecipeStartComponent } from '../components/app/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../components/app/recipes/recipes.component';
import { ShoppingListComponent } from '../components/app/shopping-list/shopping-list.component';
import { NotAuthorizedComponent } from '../components/status/not-authorized/not-authorized.component';
import { NotFoundComponent } from '../components/status/not-found/not-found.component';
import { appRoute } from 'src/app/constants/routes';
import { recipesGuard } from '../components/app/recipes/guards/recipes.guard';
import { AuthComponent } from '../components/auth/auth.component';
import { authGuard } from '../components/auth/guards/auth.guard';

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
