import { Component } from '@angular/core';
import { Operation } from 'src/app/models/enums/operation';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

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
