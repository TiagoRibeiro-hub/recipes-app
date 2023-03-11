import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddIngredientToList, IngredientsListComponent } from '@app-modules/shared/components/ingredients-list/ingredients-list.component';
import { SharedModule } from '@app-modules/shared/shared.module';
import { Ingredient } from '@models/ingredients/ingredient.model';
import { ShoppingListService } from '@services/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

@Component({
    standalone: true,
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: [],
    imports: [
        ShoppingEditComponent,
        IngredientsListComponent
    ]
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
