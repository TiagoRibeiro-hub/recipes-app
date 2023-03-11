import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appToastrConfig } from '@constants/toastrConfig';
import { AppComponent } from './app.component';
import { ShellModule } from '@app-modules/shell/shell.module';
import { AppRoutingModule } from '@app-modules/routes/app-routing.module';
import { CoreModule } from './app-modules/core/core-module';


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
        ShellModule,
        AppRoutingModule
    ]
})
export class AppModule { }
