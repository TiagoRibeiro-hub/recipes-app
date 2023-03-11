import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";
import { Routes, RouterModule } from "@angular/router";

const shoppingListRoutes: Routes = [
    {
        path: '', component: ShoppingListComponent
    }
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        RouterModule.forChild(shoppingListRoutes),
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule { }


