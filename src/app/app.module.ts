import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appToastrConfig } from '@constants/toastrConfig';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '@app-modules/routes/app-routing.module';
import { CoreModule } from './app-modules/core/core-module';
import { ShellComponent } from '@app-modules/shell/shell.component';


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
        ShellComponent,
        AppRoutingModule
    ]
})
export class AppModule { }
