import { NgModule } from "@angular/core";
import { SharedModule } from "@app-modules/shared/shared.module";
import { AuthComponent } from "./auth.component";
import { Routes, RouterModule } from "@angular/router";

const authRoutes: Routes = [
    {
        path: '', component: AuthComponent,
    }
];

@NgModule({
    declarations:[
        AuthComponent,
    ],
    imports:[
        RouterModule.forChild(authRoutes),
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule { }