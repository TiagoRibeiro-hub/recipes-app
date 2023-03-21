import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [
        RouterModule,
        CommonModule,
    ]
})
export class SharedModule { }