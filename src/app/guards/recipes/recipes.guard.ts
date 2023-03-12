import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { appRoute } from '@constants/routes';
import { DataStorageService } from '@services/auth/firebase/data-storage.service';
import { RecipeService } from '@services/recipes/recipe.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesGuard {

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

export const recipesGuard = (recipesGuard = inject(RecipesGuard)) => recipesGuard.hasRecipes();

