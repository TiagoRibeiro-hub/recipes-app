import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', {read: ElementRef}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {read: ElementRef}) amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {

  }

  onAddItem() {
    this.shoppingListService.addIngredient(new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value));
  }
}
