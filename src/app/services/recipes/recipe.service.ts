import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ingredient, MetricUnit } from 'src/app/models/ingredients/ingredient.model';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { Util } from 'src/app/shared/utils/util';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('2', 'Asian Bowl', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid', '../../assets/imgs/anh-nguyen.png', [
      new Ingredient('1', 'Eggs', 3, MetricUnit.UNIT), new Ingredient('5', 'Salmon', 100, MetricUnit.KILOGRAM), new Ingredient('6', 'Peas', 150, MetricUnit.KILOGRAM)
    ]),
    new Recipe('11', 'Açorda', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid', '../../assets/imgs/anh-nguyen.png', [
      new Ingredient('2', 'Bread', 1, MetricUnit.KILOGRAM), new Ingredient('1', 'Egg Yolk', 2, MetricUnit.UNIT), new Ingredient('4', 'Seafood broth', 150, MetricUnit.LITER)
    ]),
  ];

  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private shoppingListService: ShoppingListService) { }

  get(): Recipe[] {
    return this.recipes.slice();
  }

  getById(id: string): Recipe {
    return this.recipes.slice().find(recipe => recipe.id === id);;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addList(ingredients);
  }

  add(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.emitRecipesList();
  }

  update(recipe: Recipe): void {
    Util.arrays.updateItem<Recipe>(this.recipes, rec => rec.id === recipe.id, recipe);
    this.emitRecipesList();
  }

  delete(recipe: Recipe): void {
    this.recipes = Util.arrays.removeItem<Recipe>(this.recipes, rec => rec.id !== recipe.id);
    this.emitRecipesList();
  }

  private emitRecipesList(): void {
    this.recipesChanged.next(this.recipes.slice());
  }
}
