import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { route } from 'src/app/constants/constants';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(): void {
    this.router.navigate([route.NEW], { relativeTo: this.activatedRoute });
  }
}
