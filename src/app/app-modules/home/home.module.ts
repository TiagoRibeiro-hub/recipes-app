import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "@app-modules/shared/shared.module";
import { appRoute } from "@constants/routes";
import { HomeComponent } from "./home.component";

const homeRoutes: Routes = [
    {
        path: appRoute.HOME, component: HomeComponent,
    }
]
@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(homeRoutes),
        SharedModule
    ],
    exports: [
        RouterModule,
        HomeComponent
    ]
})
export class HomeModule { }