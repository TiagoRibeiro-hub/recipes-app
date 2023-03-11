import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient, MetricUnitMapping } from 'src/app/models/ingredients/ingredient.model';

export interface IAddIngredientToList {
  id: string;
  add: boolean
}

@Component({
  selector: 'app-shared-ingredients-list',
  templateUrl: './shared-ingredients-list.component.html',
  styleUrls: ['./shared-ingredients-list.component.scss']
})
export class SharedIngredientsListComponent {
  metricUnitMapping = MetricUnitMapping;
  
  @Input() withCheckBoxes: boolean = true;
  @Input() ingredients: Ingredient[];
  @Output() selectedIngredients: EventEmitter<IAddIngredientToList> = new EventEmitter<IAddIngredientToList>();

  constructor() {}

  onChanged(event: any): void {
    this.selectedIngredients.emit({
      id: event.target.value,
      add: event.target.checked
    });
  }

  onClickIngredient(id: string): void {
    this.selectedIngredients.emit({
      id: id,
      add: true
    });
  }
}
