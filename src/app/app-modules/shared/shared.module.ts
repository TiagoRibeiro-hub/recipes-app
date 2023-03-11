import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IngredientsFormComponent } from "./components/forms/ingredients-form/ingredients-form.component";
import { IngredientsListComponent } from "./components/ingredients/ingredients-list/ingredients-list.component";

@NgModule({
    declarations: [
        IngredientsListComponent,
        IngredientsFormComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        IngredientsListComponent,
        IngredientsFormComponent
    ]
})
export class SharedModule { }