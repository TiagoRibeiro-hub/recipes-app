import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { appResolvers, appRoute } from 'src/app/constants/constants';
import { Ingredient } from 'src/app/models/ingredients/ingredient.model';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { UtilitieService } from 'src/app/services/utilities/utilitie.service';
import { AddIngredientToList } from 'src/app/shared/components/ingredients/ingredients-list/shared-ingredients-list.component';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnDestroy {
  recipe: Recipe
  selectedIngredients: Ingredient[] = [];
  documentClickedTarget$: Subscription = undefined;

  @ViewChild('dropdownRef', {read: ElementRef}) dropdownRef: ElementRef;
  
  constructor(
    private _recipeDetailCompRef: ElementRef,
    private utilitieService: UtilitieService,
    private recipeService: RecipeService,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute) {

  }
  
  ngOnDestroy(): void {
    if(this.documentClickedTarget$ !== undefined) {
      this.documentClickedTarget$.unsubscribe();
    }
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => { this.recipe = data[appResolvers.RECIPE_DETAIL]; });
    this.documentClickedTarget$ = this.utilitieService.documentClickedTarget.subscribe((target: HTMLElement) => {
      this.utilitieService.documentClickListener(this._recipeDetailCompRef, this.dropdownRef, target)
    })
  }

  toggleOpen(): void {
    this.dropdownRef.nativeElement.click();
  }

  onSelectedIngredients(ingredient: AddIngredientToList): void {
    this.selectedIngredients = Util.arrays.insertOrRemoveItem(this.recipe.ingredients, obj => obj.id === ingredient.id, ingredient.add, this.selectedIngredients);
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedIngredients);
  }

  onEditRecipe(): void {
    this.navigationService.navigateRelativeTo([appRoute.EDIT], this.activatedRoute);
  }

  onDeleteRecipe(): void {

  }


}
