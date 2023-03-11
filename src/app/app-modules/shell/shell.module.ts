import { NgModule } from '@angular/core';
import { HomeComponent } from '@app-modules/home/home.component';
import { HomeModule } from '@app-modules/home/home.module';
import { SharedModule } from '@app-modules/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    ShellComponent,
    SpinnerComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    HomeModule
  ],
  exports: [
    ShellComponent,
  ]
})
export class ShellModule { }
