import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}