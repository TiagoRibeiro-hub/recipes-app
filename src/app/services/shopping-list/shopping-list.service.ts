import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient, MetricUnit } from 'src/app/models/recipes/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('22', 'tomato', 2, MetricUnit.KILOGRAM),
    new Ingredient('23', 'cucumber', 1, MetricUnit.KILOGRAM),
    new Ingredient('24', 'orange', 3, MetricUnit.KILOGRAM)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  
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
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
