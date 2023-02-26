import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { appFirebase } from 'src/app/constants/constants';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { AuthFirebaseService } from './auth.firebase.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authServeice: AuthFirebaseService
  ) {

  }

  storeRecipes() {
    const recipes = this.recipeService.get();
    // firebase put overwritten all recipes
    this.http
      .put(
        appFirebase.PATH + appFirebase.RECIPES, recipes
      )
      .subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(appFirebase.PATH + appFirebase.RECIPES)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.set(recipes)
        })
      )
  }

}
