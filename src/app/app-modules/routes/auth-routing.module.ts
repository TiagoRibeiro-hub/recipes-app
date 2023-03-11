import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "@app-modules/auth/auth.component";
import { NotAuthorizedComponent } from "@app-modules/auth/status/not-authorized/not-authorized.component";
import { NotFoundComponent } from "@app-modules/auth/status/not-found/not-found.component";
import { appRoute } from "@constants/routes";

const authRoutes: Routes = [
    {
        path: appRoute.AUTH, component: AuthComponent,
    },
    {
        path: appRoute.NOT_AUTHORIZED, component: NotAuthorizedComponent
    },
    {
        path: appRoute.NOT_FOUND, component: NotFoundComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }