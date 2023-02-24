import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteModule } from './routes/route.module';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/app/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/app/shopping-list/shopping-edit/shopping-edit.component';
import { ShellComponent } from './shell/shell.component';
import { NotFoundComponent } from './components/status/not-found/not-found.component';
import { RecipesComponent } from './components/app/recipes/recipes.component';
import { RecipeListComponent } from './components/app/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/app/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './components/app/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/app/recipes/recipe-edit/recipe-edit.component';
import { HeaderComponent } from './shell/header/header.component';
import { SpinnerComponent } from './shell/spinner/spinner.component';
import { SharedIngredientsListComponent } from './shared/components/ingredients/ingredients-list/shared-ingredients-list.component';
import { IngredientsFormComponent } from './shared/components/forms/ingredients-form/ingredients-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotAuthorizedComponent } from './components/status/not-authorized/not-authorized.component';

import { appToastrConfig } from './constants/toastrConfig';


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
    providers: [],
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
