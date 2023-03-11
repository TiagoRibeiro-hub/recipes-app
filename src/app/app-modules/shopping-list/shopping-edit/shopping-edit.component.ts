import { Component, OnInit } from '@angular/core';
import { Operation } from '@enums/operation';
import { IngredientsService } from '@services/ingredients/ingredients.service';
import { ShoppingListService } from '@services/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  private ingredientEditingFromShoopingList$: Subscription = undefined;

  constructor(
    private shoppingListService: ShoppingListService,
    private ingredientsService: IngredientsService
  ) { }
  
  ngOnDestroy(): void {
    if (this.ingredientEditingFromShoopingList$ !== undefined) {
      this.ingredientEditingFromShoopingList$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.ingredientEditingFromShoopingList$ = this.shoppingListService.ingredientEditingFromShoopingList.subscribe((id: string) => {
      this.ingredientsService.ingredientEditing.next(this.shoppingListService.getById(id));
    });
  }

  onClickEvent(event) {
    switch (event.operation) {
      case Operation.ADD:
        this.shoppingListService.add(event.ingredient);
        break;
      case Operation.UPDATE:
        this.shoppingListService.update(event.ingredient)
        break;
      case Operation.DELETE:
        this.shoppingListService.delete(event.ingredient);
        break;
    }
  }

}
