import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Util } from "src/app/utils/util";
import { appResolvers } from '@constants/constants';
import { appRoute } from '@constants/routes';
import { Ingredient } from '@models/ingredients/ingredient.model';
import { Recipe } from '@models/recipes/recipe.model';
import { NavigationService } from '@services/navigation/navigation.service';
import { RecipeService } from '@services/recipes/recipe.service';
import { UtilitieService } from '@services/utilities/utilitie.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataStorageService } from '@services/auth/firebase/data-storage.service';
import { IngredientsListComponent, IAddIngredientToList } from '@components/ingredients/ingredients-list/ingredients-list.component';



@Component({
  standalone: true,
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [],
  imports: [IngredientsListComponent]
})
export class RecipeDetailComponent implements OnDestroy {
  recipe: Recipe
  selectedIngredients: Ingredient[] = [];
  documentClickedTarget$: Subscription = undefined;

  @ViewChild('dropdownRef', { read: ElementRef }) dropdownRef: ElementRef;

  constructor(
    private _recipeDetailCompRef: ElementRef,
    private utilitieService: UtilitieService,
    private recipeService: RecipeService,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dataStorageService: DataStorageService) {

  }

  ngOnDestroy(): void {
    if (this.documentClickedTarget$ !== undefined) {
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
    let message = 'The ingredients have been successfully added to the shopping list';
    if (this.selectedIngredients.length == 0) {
      this.selectedIngredients.push(...this.recipe.ingredients);
      message = 'All ingredients have been successfully added to the shopping list';
    }
    this.recipeService.addIngredientsToShoppingList(this.selectedIngredients);
    this.toastr.success(message);
  }

  onEditRecipe(): void {
    this.navigationService.navigateRelativeTo([appRoute.EDIT], this.activatedRoute);
  }

  onDeleteRecipe(): void {
    this.recipeService.delete(this.recipe);
    this.navigationService.navigatePrevious(this.activatedRoute);
    this.dataStorageService.storeRecipes();
  }


}
