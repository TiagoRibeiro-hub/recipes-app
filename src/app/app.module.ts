import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { appToastrConfig } from './constants/toastrConfig';
import { AuthInterceptorService } from './services/auth/interceptors/auth-interceptor.service';
import { LoaderInterceptorService } from './services/loader/interceptors/loader-interceptor.service';
import { AuthComponent } from './app-modules/auth/auth.component';
import { NotAuthorizedComponent } from './app-modules/auth/status/not-authorized/not-authorized.component';
import { NotFoundComponent } from './app-modules/auth/status/not-found/not-found.component';
import { RecipeDetailComponent } from './app-modules/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './app-modules/recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './app-modules/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './app-modules/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './app-modules/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './app-modules/recipes/recipes.component';
import { RouteModule } from './app-modules/routes/route.module';
import { IngredientsFormComponent } from './app-modules/shared/components/forms/ingredients-form/ingredients-form.component';
import { SharedIngredientsListComponent } from './app-modules/shared/components/ingredients/ingredients-list/shared-ingredients-list.component';
import { HeaderComponent } from './app-modules/shell/header/header.component';
import { ShellComponent } from './app-modules/shell/shell.component';
import { SpinnerComponent } from './app-modules/shell/spinner/spinner.component';
import { ShoppingEditComponent } from './app-modules/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './app-modules/shopping-list/shopping-list.component';
import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        SharedIngredientsListComponent,
        ShellComponent,
        NotFoundComponent,
        NotAuthorizedComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        SpinnerComponent,
        HeaderComponent,
        IngredientsFormComponent,
        AuthComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouteModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(appToastrConfig),
        // ShellModule
    ]
})
export class AppModule { }
