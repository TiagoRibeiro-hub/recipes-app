import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Asian Bowl', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid', '../../assets/imgs/anh-nguyen.png', [
      new Ingredient('Eggs', 3), new Ingredient('Salmon', 100), new Ingredient('Peas', 150)
    ]),
    new Recipe('Acorda', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid', '../../assets/imgs/anh-nguyen.png', [
      new Ingredient('Bread', 500), new Ingredient('Egg Yolk', 2), new Ingredient('Seafood broth', 150)
    ]),
  ];

  recipeSelected = new EventEmitter<Recipe>();
  
  constructor(
    private shoppingListService: ShoppingListService) { }

  getRecipes() : Recipe[]{
    return this.recipes.slice();
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
