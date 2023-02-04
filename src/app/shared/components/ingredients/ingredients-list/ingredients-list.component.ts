import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent {
  @Input() ingredients: Ingredient[];
}
