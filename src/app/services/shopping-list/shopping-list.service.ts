import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient, MetricUnit } from 'src/app/models/ingredients/ingredient.model';
import { Util } from 'src/app/shared/utils/util';

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
  ingredientEditing = new Subject<string>();

  constructor() { }

  get() : Ingredient[] {
    return this.ingredients.slice();
  }

  getById(id: string) : Ingredient {
    return this.ingredients.find(ingredient => ingredient.id === id);
  }

  add(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.emitNewIngredientsList();
  }

  addList(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.emitNewIngredientsList();
  }

  update(ingredient: Ingredient): void {
    const index = this.ingredients.findIndex(ingr => ingr.id === ingredient.id);
    this.ingredients[index] = ingredient;
    this.emitNewIngredientsList();
  }

  delete(id: string): void {
    this.ingredients = Util.arrays.removeItem<Ingredient>(this.ingredients, ingr => ingr.id !== id);
    this.emitNewIngredientsList();
  }

  private emitNewIngredientsList(): void {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
