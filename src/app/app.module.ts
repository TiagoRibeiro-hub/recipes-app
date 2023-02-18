import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteModule } from './routes/route.module';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/app/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/app/shopping-list/shopping-edit/shopping-edit.component';
import { ShellComponent } from './shell/shell.component';
import { NotFoundComponent } from './components/app/errors/not-found/not-found.component';
import { RecipesComponent } from './components/app/recipes/recipes.component';
import { RecipeListComponent } from './components/app/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/app/recipes/recipe-list/recipe-item/recipe-item.component';
import { NotAuthorizedComponent } from './components/app/errors/not-authorized/not-authorized.component';
import { RecipeStartComponent } from './components/app/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/app/recipes/recipe-edit/recipe-edit.component';
import { HeaderComponent } from './shell/header/header.component';
import { SpinnerComponent } from './shell/spinner/spinner.component';
import { SharedIngredientsListComponent } from './shared/components/ingredients/ingredients-list/shared-ingredients-list.component';
import { IngredientsFormComponent } from './shared/components/ingredients/ingredients-form/ingredients-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
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
        IngredientsFormComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouteModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(appToastrConfig), 
        // ShellModule
    ]
})
export class AppModule { }
