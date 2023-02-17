import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { AddIngredientToList } from 'src/app/shared/components/ingredients/ingredients-list/shared-ingredients-list.component';

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

  onSelectedIngredient(ingredient: AddIngredientToList): void {
    this.shoppingListService.ingredientEditing.next(ingredient.id);
  }
}
