import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient, MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/recipes/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  @ViewChild('nameInput', {read: ElementRef}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {read: ElementRef}) amountInputRef: ElementRef;
  @ViewChild('metricUnitOption', {read: ElementRef}) metricUnitOptionRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {

  }

  onAddItem(): void {
    this.shoppingListService.addIngredient(
      new Ingredient(
        new Date().getMilliseconds().toString(), 
        this.nameInputRef.nativeElement.value, 
        this.amountInputRef.nativeElement.value,
        this.metricUnitOptionRef.nativeElement.value
        ));
  }

  onDeleteItem() {
    
  }

  onClearItem() {

  }
}
