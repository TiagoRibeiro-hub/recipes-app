import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  ingredientsChanged$: Subscription = undefined;

  constructor(
    private shoppingListService: ShoppingListService) {

  }
  ngOnDestroy(): void {
    if(this.ingredientsChanged$ !== undefined) { 
      this.ingredientsChanged$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChanged$ = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onSelectedIngredients(ingredient: Ingredient): void {
    this.selectedIngredients.push(ingredient);
  }

}
