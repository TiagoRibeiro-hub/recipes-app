import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { appUrlFirebase } from 'src/app/constants/constants';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.get();
    // firebase put overwritten all recipes
    this.http
      .put(
        appUrlFirebase.PATH + appUrlFirebase.RECIPES, recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        appUrlFirebase.PATH + appUrlFirebase.RECIPES
      )
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
      );
  }
}
