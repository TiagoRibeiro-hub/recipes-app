import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from '../components/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from '../components/app/recipes/recipe-detail/resolver/recipe-detail-resolver';
import { RecipeEditComponent } from '../components/app/recipes/recipe-edit/recipe-edit.component';
import { RecipeEditResolver } from '../components/app/recipes/recipe-edit/resolver/recipe-edit-resolver';
import { RecipeStartComponent } from '../components/app/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../components/app/recipes/recipes.component';
import { ShoppingListComponent } from '../components/app/shopping-list/shopping-list.component';
import { NotAuthorizedComponent } from '../components/auth/not-authorized/not-authorized.component';
import { NotFoundComponent } from '../components/auth/not-found/not-found.component';
import { appRoute } from '../constants/constants';

const appRoutes : Routes = [
  {path: '', redirectTo: '/' + appRoute.RECIPES, pathMatch: 'full'},
  // RECIPES
  {path: appRoute.RECIPES, component: RecipesComponent, 
    children: [
      {path: '', component: RecipeStartComponent},
      {path: appRoute.NEW, component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipeDetail: RecipeDetailResolver}},
      {path: ':id/' + appRoute.EDIT, component: RecipeEditComponent, resolve: {recipeEdit: RecipeEditResolver}},
    ]
  },
  // SHOPPING LIST
  {path: appRoute.SHOPPING_LIST, component: ShoppingListComponent},
  // AUTH appRouteS
  {path: appRoute.NOT_AUTHORIZED, component: NotAuthorizedComponent},
  {path: appRoute.NOT_FOUND, component: NotFoundComponent},
  {path: '**', redirectTo: '/' + appRoute.NOT_FOUND}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class RouteModule { }
