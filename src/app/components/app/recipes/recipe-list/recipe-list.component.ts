import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { appRoute } from 'src/app/constants/constants';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes: Recipe[] = [];
  recipesChanged$: Subscription = undefined;

  constructor(
    private recipeService: RecipeService,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnDestroy(): void {
    if(this.recipesChanged$ !== undefined) { 
      this.recipesChanged$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.recipesChanged$ = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.get();
  }

  onNewRecipe(): void {
    this.navigationService.navigateRelativeTo([appRoute.NEW], this.activatedRoute);
  }
}
