import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ingredient, MetricUnit } from 'src/app/models/ingredients/ingredient.model';
import { Recipe } from 'src/app/models/recipes/recipe.model';
import { Util } from 'src/app/shared/utils/util';
import { IngredientsService } from '../ingredients/ingredients.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('2', 'Asian Bowl', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid', '../../assets/imgs/anh-nguyen.png', [
      new Ingredient('1', 'Eggs', 3, MetricUnit.UNIT), new Ingredient('5', 'Salmon', 100, MetricUnit.KILOGRAM), new Ingredient('6', 'Peas', 150, MetricUnit.KILOGRAM)
    ]),
    new Recipe('11', 'Açorda', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid', '../../assets/imgs/anh-nguyen.png', [
      new Ingredient('2', 'Bread', 1, MetricUnit.KILOGRAM), new Ingredient('1', 'Egg Yolk', 2, MetricUnit.UNIT), new Ingredient('4', 'Seafood broth', 150, MetricUnit.LITER)
    ]),
  ];
  
  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private shoppingListService: ShoppingListService,
    private ingredientsService: IngredientsService) { }

  get() : Recipe[]{
    return this.recipes.slice();
  }

  getById(id: string) : Recipe {
    return this.recipes.slice().find(recipe => recipe.id === id);;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addList(ingredients);
  }

  add(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.emitRecipesList();
  } 

  update(recipe: Recipe): void {
    Util.arrays.updateItem<Recipe>(this.recipes, rec => rec.id === recipe.id, recipe); 
    this.emitRecipesList(); 
  }

  getEmptyForm(): FormGroup {
    return new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null),
      'ingredients': new FormArray([this.ingredientsService.getEmptyForm()])
    });
  }

  getForm(recipe: Recipe, ingredients: FormArray): FormGroup {
    return new FormGroup({
      'id': new FormControl(recipe.id),
      'name': new FormControl(recipe.name, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'imagePath': new FormControl(recipe.imagePath),
      'ingredients': ingredients
    })
  }

  private emitRecipesList(): void {
    this.recipesChanged.next(this.recipes.slice());
  }
}
