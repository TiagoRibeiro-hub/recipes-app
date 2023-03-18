import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { HomeComponent } from '@components/home/home.component';
import { appRoute } from '@constants/routes';
import { authGuard } from '@guards/auth/auth.guard';
import { PreloadingStrategyService } from '@modules/routes/preloading-strategy/preloading-strategy.service';

//https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198

let appRoutes: Routes = [
  {
    path: '', redirectTo: '/' + appRoute.HOME, pathMatch: 'full'
  },
  {
    path: appRoute.HOME, component: HomeComponent
  },
  {
    path: appRoute.AUTH,
    component: AuthComponent
  },
  {
    path: appRoute.RECIPES,
    canMatch: [authGuard],
    loadChildren: () => import('./recipes.routes').then(r => r.RECIPES_ROUTES)
  },
  {
    path: appRoute.INGREDIENTS,
    canMatch: [authGuard],
    loadComponent: () => import('@components/ingredients/ingredients.component').then(c => c.IngredientsComponent)
  },
  {
    path: appRoute.SHOPPING_LIST,
    loadComponent: () => import('@components/shopping-list/shopping-list.component').then(c => c.ShoppingListComponent)
  },
  {
    path: appRoute.STATUS,
    loadChildren: () => import('./status.routes').then(r => r.STATUS_ROUTES)
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
        preloadingStrategy: PreloadingStrategyService,
      }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

