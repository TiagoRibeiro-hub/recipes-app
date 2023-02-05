import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('22', 'tomato', 2),
    new Ingredient('23', 'cucumber', 1),
    new Ingredient('24', 'orange', 3)
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();
  
  constructor() { }

  getIngredients() : Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.emitNewIngredientsList();
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.emitNewIngredientsList();
  }

  private emitNewIngredientsList(): void {
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
