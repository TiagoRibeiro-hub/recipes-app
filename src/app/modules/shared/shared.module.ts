import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule { }