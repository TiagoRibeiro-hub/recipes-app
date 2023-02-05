import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/recipes/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];

  constructor(
    private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) =>{
      this.ingredients = ingredients;
    });
  }

  onSelectedIngredients(ingredient: Ingredient): void {
    this.selectedIngredients.push(ingredient);
  }

}
