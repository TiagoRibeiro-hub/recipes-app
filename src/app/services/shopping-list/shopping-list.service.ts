import { Injectable } from "@angular/core";
import { Util } from "@app-modules/shared/utils/util";
import { Ingredient } from "@models/ingredients/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingList: Ingredient[] = [];

  shoppingListChanged = new Subject<Ingredient[]>();
  ingredientEditingFromShoopingList = new Subject<string>();
  
  constructor() { }

  get() : Ingredient[] {
    return this.shoppingList.slice();
  }

  getById(id: string) : Ingredient {
    var ss = this.get().find(ingredient => ingredient.id === id);
    return ss;
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
