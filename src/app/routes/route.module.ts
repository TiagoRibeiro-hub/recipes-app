import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from '../components/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../components/app/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../components/app/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../components/app/recipes/recipes.component';
import { ShoppingListComponent } from '../components/app/shopping-list/shopping-list.component';
import { NotAuthorizedComponent } from '../components/auth/not-authorized/not-authorized.component';
import { NotFoundComponent } from '../components/auth/not-found/not-found.component';
import { route } from '../constants/constants';

const appRoutes : Routes = [
  {path: '', redirectTo: '/' + route.RECIPES, pathMatch: 'full'},
  // RECIPES
  {path: route.RECIPES, component: RecipesComponent, 
    children: [
      {path: '', component: RecipeStartComponent},
      {path: route.NEW, component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/' + route.EDIT, component: RecipeEditComponent},
    ]
  },
  // SHOPPING LIST
  {path: route.SHOPPING_LIST, component: ShoppingListComponent},
  // AUTH ROUTES
  {path: route.NOT_AUTHORIZED, component: NotAuthorizedComponent},
  {path: route.NOT_FOUND, component: NotFoundComponent},
  {path: '**', redirectTo: '/' + route.NOT_FOUND}
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
