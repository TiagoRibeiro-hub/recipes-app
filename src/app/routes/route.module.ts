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
import { recipesCanActivate } from '../components/app/recipes/recipe-edit/guard/recipes-can-activate.service';
import { AuthComponent } from '../components/auth/auth.component';

//https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
// RECIPES
const recipeRoutes = {
    path: appRoute.RECIPES, component: RecipesComponent,
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
        canActivate: [async () => await recipesCanActivate()],
        resolve: {
          recipeDetail: RecipeDetailResolver
        }
      },
      {
        path: ':id/' + appRoute.EDIT, component: RecipeEditComponent, 
        canActivate: [async () => await recipesCanActivate()],
        resolve: {
          recipeEdit: RecipeEditResolver
        }
      },
    ]
  };
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
