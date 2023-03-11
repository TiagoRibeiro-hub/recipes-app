import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appToastrConfig } from '@constants/toastrConfig';
import { AppComponent } from './app.component';
import { ShellModule } from '@app-modules/shell/shell.module';
import { AppRoutingModule } from '@app-modules/routes/app-routing.module';
import { AuthModule } from '@app-modules/auth/auth.module';
import { RecipesModule } from '@app-modules/recipes/recipes.module';
import { ShoppingListModule } from '@app-modules/shopping-list/shopping-list.module';
import { CoreModule } from './core-module';
import { SharedModule } from '@app-modules/shared/shared.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        CoreModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(appToastrConfig),
        AppRoutingModule,
        SharedModule,
        ShellModule,
        AuthModule,
        RecipesModule,
        ShoppingListModule,
    ]
})
export class AppModule { }
