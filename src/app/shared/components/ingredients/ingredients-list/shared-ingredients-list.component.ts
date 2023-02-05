import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';

export interface AddIngredient {
  id: string;
  add: boolean
}

@Component({
  selector: 'app-shared-ingredients-list',
  templateUrl: './shared-ingredients-list.component.html',
  styleUrls: ['./shared-ingredients-list.component.scss']
})
export class SharedIngredientsListComponent {
  @Input() ingredients: Ingredient[];
  @Output() selectedIngredients: EventEmitter<AddIngredient> = new EventEmitter<AddIngredient>();

  constructor() {}

  onChanged(event: any): void {
    let addIngredient = {
      id: event.target.value,
      add: event.target.checked
    };
    this.selectedIngredients.emit(addIngredient);
  }
}
