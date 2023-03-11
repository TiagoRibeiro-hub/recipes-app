import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/app-modules/recipes/recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor() {}

}
