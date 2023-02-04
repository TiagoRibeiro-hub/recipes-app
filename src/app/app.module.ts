import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shell/header/header.component';
import { ShoppingListComponent } from './components/app/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/app/shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { IngredientsListComponent } from './shared/components/ingredients/ingredients-list/ingredients-list.component';
import { ShellComponent } from './shell/shell.component';
import { NotFoundComponent } from './components/auth/not-found/not-found.component';
import { RecipesComponent } from './components/app/recipes/recipes.component';
import { RecipeListComponent } from './components/app/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/app/recipes/recipe-list/recipe-item/recipe-item.component';
import { NotAuthorizedComponent } from './components/auth/not-authorized/not-authorized.component';
import { RouteModule } from './routes/route.module';
import { RecipeStartComponent } from './components/app/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/app/recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    IngredientsListComponent,
    ShellComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
