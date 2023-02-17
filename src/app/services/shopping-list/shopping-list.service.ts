import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient, MetricUnit } from 'src/app/models/ingredients/ingredient.model';
import { Util } from 'src/app/shared/utils/util';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingList: Ingredient[] = [];

  shoppingListChanged = new Subject<Ingredient[]>();
  ingredientEditing = new Subject<string>();
  
  constructor() { }

  get() : Ingredient[] {
    return this.shoppingList.slice();
  }

  getById(id: string) : Ingredient {
    return this.shoppingList.find(ingredient => ingredient.id === id);
  }

  add(ingredient: Ingredient): void {
    this.shoppingList.push(ingredient);
    this.emitNewIngredientsList();
  }

  addList(ingredients: Ingredient[]): void {
    this.shoppingList.push(...ingredients);
    this.emitNewIngredientsList();
  }

  update(ingredient: Ingredient): void {
    Util.arrays.updateItem<Ingredient>(this.shoppingList, ingr => ingr.id === ingredient.id, ingredient);  
    this.emitNewIngredientsList();
  }

  delete(ingredient: Ingredient): void {
    this.shoppingList = Util.arrays.removeItem<Ingredient>(this.shoppingList, ingr => ingr.id !== ingredient.id);
    this.emitNewIngredientsList();
  }

  private emitNewIngredientsList(): void {
    this.shoppingListChanged.next(this.shoppingList.slice());
  }
}
