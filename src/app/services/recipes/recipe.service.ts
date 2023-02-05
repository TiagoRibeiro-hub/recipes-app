import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient, MetricUnit } from 'src/app/models/recipes/ingredient.model';
import { Recipe } from 'src/app/models/recipes/recipe.model';
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

  recipeSelected = new EventEmitter<Recipe>();
  
  constructor(
    private shoppingListService: ShoppingListService) { }

  getRecipes() : Recipe[]{
    return this.recipes.slice();
  }

  getRecipeById(id: string) : Recipe {
    return this.recipes.slice().find(recipe => recipe.id === id);;
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
