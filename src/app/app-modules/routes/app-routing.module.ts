import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { appRoute } from '@constants/routes';

//https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198

let appRoutes: Routes = [
  {
    path: '', redirectTo: '/' + appRoute.HOME, pathMatch: 'full'
  },
  {
    path: appRoute.AUTH,
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: appRoute.RECIPES,
    loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: appRoute.INGREDIENTS,
    loadChildren: () => import('../ingredients/ingredients.module').then(m => m.IngredientsModule)
  },
  {
    path: appRoute.SHOPPING_LIST,
    loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: appRoute.STATUS,
    loadChildren: () => import('../status/status.module').then(m => m.StatusModule)
  },
  {
    path: '**', redirectTo: '/' + appRoute.STATUS + '/' + appRoute.NOT_FOUND
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: PreloadAllModules
      }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
