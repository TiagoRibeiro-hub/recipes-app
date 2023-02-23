import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { appRoute } from 'src/app/constants/routes';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesCanActivateService {

  constructor(
    private recipesService: RecipeService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  async hasRecipes(): Promise<boolean> {
    let recipes = this.recipesService.get();
    if (recipes.length == 0) {
      recipes = await firstValueFrom(this.dataStorageService.fetchRecipes());
    }
    if (recipes.length > 0) {
      return true;
    }
    return this.router.navigate([appRoute.RECIPES]);;
  }
}

export const recipesCanActivate = (recipesCanActivateService = inject(RecipesCanActivateService)) => recipesCanActivateService.hasRecipes();

