import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appToastrConfig } from '@constants/toastrConfig';
import { AppComponent } from './app.component';
import { ShellModule } from '@app-modules/shell/shell.module';
import { AppRoutingModule } from '@app-modules/routes/app-routing.module';
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
        SharedModule,
        ShellModule,
        AppRoutingModule // must be the last module
    ]
})
export class AppModule { }
