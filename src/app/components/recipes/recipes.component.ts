import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { Recipe } from '../../models/recipes/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }
  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((rescipe: Recipe) => {
      this.selectedRecipe = rescipe;
    });
  }


}
