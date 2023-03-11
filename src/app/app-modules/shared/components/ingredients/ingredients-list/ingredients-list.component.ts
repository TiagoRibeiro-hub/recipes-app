import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient, MetricUnitMapping } from '@models/ingredients/ingredient.model';


export interface IAddIngredientToList {
  id: string;
  add: boolean
}

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent {
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
