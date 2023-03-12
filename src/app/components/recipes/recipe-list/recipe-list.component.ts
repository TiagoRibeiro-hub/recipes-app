import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appRoute } from '@constants/routes';
import { Recipe } from '@models/recipes/recipe.model';
import { SharedModule } from '@modules/shared/shared.module';
import { DataStorageService } from '@services/auth/firebase/data-storage.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { RecipeService } from '@services/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';


@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [],
  imports: [
    SharedModule,
    RecipeItemComponent
  ]
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
