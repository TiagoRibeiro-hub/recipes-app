import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "@app-modules/routes/auth-routing.module";
import { SharedModule } from "@app-modules/shared/shared.module";
import { AuthComponent } from "./auth.component";
import { NotAuthorizedComponent } from "./status/not-authorized/not-authorized.component";
import { NotFoundComponent } from "./status/not-found/not-found.component";

@NgModule({
    declarations:[
        AuthComponent,
        NotFoundComponent,
        NotAuthorizedComponent
    ],
    imports:[
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }