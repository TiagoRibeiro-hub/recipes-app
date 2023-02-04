import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';


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
