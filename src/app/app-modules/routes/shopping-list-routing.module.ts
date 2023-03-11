import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "@app-modules/shopping-list/shopping-list.component";
import { appRoute } from "@constants/routes";

const shoppingListRoutes: Routes = [
    {
        path: appRoute.SHOPPING_LIST, component: ShoppingListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingListRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class ShoppingListRoutingModule { }