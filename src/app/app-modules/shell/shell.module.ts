import { NgModule } from '@angular/core';
import { SharedModule } from '@app-modules/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoute } from '@constants/routes';

const shellRoutes: Routes = [
  {
    path: appRoute.HOME, component: HomeComponent,
  }
]
@NgModule({
  declarations: [
    ShellComponent,
    SpinnerComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(shellRoutes),
    SharedModule
  ],
  exports: [
    ShellComponent,
    RouterModule
  ]
})
export class ShellModule { }
