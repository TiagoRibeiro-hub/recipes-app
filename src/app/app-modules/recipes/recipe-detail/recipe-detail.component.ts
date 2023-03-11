import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IAddIngredientToList } from '@app-modules/shared/components/ingredients/ingredients-list/ingredients-list.component';
import { Util } from "@app-modules/shared/utils/util";
import { appResolvers } from '@constants/constants';
import { appRoute } from '@constants/routes';
import { Ingredient } from '@models/ingredients/ingredient.model';
import { Recipe } from '@models/recipes/recipe.model';
import { NavigationService } from '@services/navigation/navigation.service';
import { RecipeService } from '@services/recipes/recipe.service';
import { UtilitieService } from '@services/utilities/utilitie.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';



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
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {

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

  onSelectedIngredients(ingredient: IAddIngredientToList): void {
    this.selectedIngredients = Util.arrays.insertOrRemoveItem(this.recipe.ingredients, obj => obj.id === ingredient.id, ingredient.add, this.selectedIngredients);
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedIngredients);
    
    if(this.selectedIngredients.length) {
      this.toastr.success('Added to shopping list successfully');
    }

  }

  onEditRecipe(): void {
    this.navigationService.navigateRelativeTo([appRoute.EDIT], this.activatedRoute);
  }

  onDeleteRecipe(): void {
    this.recipeService.delete(this.recipe);
    this.navigationService.navigatePrevious(this.activatedRoute);
  }


}
