import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const ingredientsRoutes: Routes = [
    // {
    //     path: appRoute.INGREDIENTS,
    //     component: IngredientListComponent,
    //     canActivate: [async () => await authGuard()],
    // }
];

@NgModule({
    imports: [
        RouterModule.forChild(ingredientsRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class ShoppingListRoutingModule { }