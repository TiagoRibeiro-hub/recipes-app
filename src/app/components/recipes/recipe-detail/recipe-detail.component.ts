import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe
  @ViewChild('dropdownRef', {read: ElementRef}) dropdownRef: ElementRef;
  
  constructor(
    private recipeService: RecipeService) {

  }

  toggleOpen(): void {
    this.dropdownRef.nativeElement.click();
  }

  onAddToShoppingList(): void {
    this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredients);
  }
}
