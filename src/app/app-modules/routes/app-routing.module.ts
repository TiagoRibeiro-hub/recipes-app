import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from '@app-modules/auth/guards/auth.guard';
import { appRoute } from '@constants/routes';

//https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198

let appRoutes: Routes = [
  {
    path: '', redirectTo: '/' + appRoute.HOME, pathMatch: 'full'
  },
  {
    path: appRoute.AUTH,
    loadComponent: () => import('../auth/auth.component').then(c => c.AuthComponent)
  },
  {
    path: appRoute.HOME,
    loadComponent: () => import('../home/home.component').then(c => c.HomeComponent)
  },
  {
    path: appRoute.RECIPES,
    loadChildren: () => import('../recipes/recipes.module').then(c => c.RecipesModule)
  },
  {
    path: appRoute.INGREDIENTS,
    canActivate: [async () => await authGuard()],
    loadComponent: () => import('../ingredients/ingredients.component').then(c => c.IngredientsComponent)
  },
  {
    path: appRoute.SHOPPING_LIST,
    loadComponent: () => import('../shopping-list/shopping-list.component').then(c => c.ShoppingListComponent)
  },
  {
    path: appRoute.STATUS,
    loadChildren: () => import('../status/status.routes').then(r => r.STATUS_ROUTES)
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
