import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { appFirebase } from "@constants/firebase";
import { Recipe } from "@models/recipes/recipe.model";
import { RecipeService } from "@services/recipes/recipe.service";
import { Observable, map, tap } from "rxjs";
import { AuthHelper } from "../auth.helper";



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {

  }

  storeRecipes() {
    const recipes = this.recipeService.get();
    // firebase put overwritten all recipes
    this.http
      .put(
        appFirebase.PATH + appFirebase.RECIPES, recipes, 
        {
          headers: AuthHelper.setHeader()  
        }
      )
      .subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(appFirebase.PATH + appFirebase.RECIPES,
      {
        headers: AuthHelper.setHeader()  
      })
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
