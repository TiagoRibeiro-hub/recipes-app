import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient, MetricUnitMapping } from 'src/app/models/recipes/ingredient.model';

export interface AddIngredientToList {
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
  
  @Input() ingredients: Ingredient[];
  @Output() selectedIngredients: EventEmitter<AddIngredientToList> = new EventEmitter<AddIngredientToList>();

  constructor() {}

  onChanged(event: any): void {
    this.selectedIngredients.emit({
      id: event.target.value,
      add: event.target.checked
    });
  }
}
