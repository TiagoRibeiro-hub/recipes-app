import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddIngredientToList } from '@app-modules/shared/components/ingredients/ingredients-list/ingredients-list.component';
import { Ingredient } from '@models/ingredients/ingredient.model';
import { ShoppingListService } from '@services/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  shoppingListChanged$: Subscription = undefined;

  constructor(
    private shoppingListService: ShoppingListService) {

  }
  ngOnDestroy(): void {
    if(this.shoppingListChanged$ !== undefined) { 
      this.shoppingListChanged$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.get();
    this.shoppingListChanged$ = this.shoppingListService.shoppingListChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onSelectedIngredient(ingredient: IAddIngredientToList): void {
    this.shoppingListService.ingredientEditingFromShoopingList.next(ingredient.id);
  }
}
