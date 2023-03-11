import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@app-modules/auth/guards/auth.guard';
import { SharedModule } from '@app-modules/shared/shared.module';
import { IngredientsComponent } from './ingredients.component';

const ingredientsRoutes: Routes = [
  {
      path: '',
      component: IngredientsComponent,
      canActivate: [async () => await authGuard()],
      children: [
        
      ]
  }
];

@NgModule({
  declarations: [
    IngredientsComponent
  ],
  imports: [
    RouterModule.forChild(ingredientsRoutes),
    SharedModule
],
exports: [
    RouterModule
]
})
export class IngredientsModule { }
