import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoute } from '@constants/routes';

//https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198

let appRoutes : Routes = [
  {path: '', redirectTo: '/' + appRoute.RECIPES, pathMatch: 'full'},
  // {path: '**', redirectTo: '/' + appRoute.NOT_FOUND}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
