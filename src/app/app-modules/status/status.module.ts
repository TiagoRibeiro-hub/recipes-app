import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "@app-modules/shared/shared.module";
import { appRoute } from "@constants/routes";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { StatusComponent } from './status/status.component';

const authRoutes: Routes = [
    {
        path: '',
        component: StatusComponent,
        children: [
            {
                path: appRoute.NOT_AUTHORIZED, component: NotAuthorizedComponent
            },
            {
                path: appRoute.NOT_FOUND, component: NotFoundComponent
            }
        ]
    }
];

@NgModule({
    declarations:[
        StatusComponent,
        NotFoundComponent,
        NotAuthorizedComponent
    ],
    imports:[
        RouterModule.forChild(authRoutes),
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class StatusModule { }