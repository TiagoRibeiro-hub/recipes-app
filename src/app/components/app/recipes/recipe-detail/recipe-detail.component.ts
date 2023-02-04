import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { route } from 'src/app/constants/constants';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { UtilitieService } from 'src/app/services/utilities/utilitie.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  recipe: Recipe

  @ViewChild('dropdownRef', {read: ElementRef}) dropdownRef: ElementRef;
  
  constructor(
    private _recipeDetailCompRef: ElementRef,
    private utilitieService: UtilitieService,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(params['id']);
    });
    
    this.utilitieService.documentClickedTarget.subscribe(target => this.documentClickListener(target))
  }

  toggleOpen(): void {
    this.dropdownRef.nativeElement.click();
  }

  onAddToShoppingList(): void {
    this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate([route.EDIT], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe(): void {

  }

  documentClickListener(target: any): void {
    this.utilitieService.documentClickListener(this._recipeDetailCompRef, this.dropdownRef, target);
  }
}
