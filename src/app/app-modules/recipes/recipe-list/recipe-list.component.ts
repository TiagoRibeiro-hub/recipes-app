import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { appRoute } from 'src/app/constants/routes';
import { Recipe } from 'src/app/app-modules/recipes/recipe.model';
import { DataStorageService } from 'src/app/services/auth/firebase/data-storage.service';
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
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService) {

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

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}