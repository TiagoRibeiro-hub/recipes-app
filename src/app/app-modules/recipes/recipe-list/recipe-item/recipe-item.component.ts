import { Component, Input } from '@angular/core';
import { SharedModule } from '@app-modules/shared/shared.module';
import { Recipe } from '@models/recipes/recipe.model';

@Component({
  standalone: true,
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  imports: [
    SharedModule
  ]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor() {}

}
