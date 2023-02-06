import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient, MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('formRef') formRef: NgForm;
  
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  editMode = false;
  editedIngredientId: string;
  editedIngredient: Ingredient;

  private ingredientEditing$: Subscription = undefined;

  constructor(
    private shoppingListService: ShoppingListService,
    // private ingredientService: IngredientService
    ) {

  }

  ngOnDestroy(): void {
    if(this.ingredientEditing$ !== undefined) {
      this.ingredientEditing$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.ingredientEditing$ = this.shoppingListService.ingredientEditing.subscribe((ingredientId: string) => {
      this.editMode = true;
      this.editedIngredientId = ingredientId;
      this.editedIngredient = this.shoppingListService.getIngredientById(ingredientId);
      this.formRef.setValue({
        id: this.editedIngredient.id,
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount,
        metricUnit: this.editedIngredient.metricUnit
      });
    });
  }

  onAddIngredient(form: NgForm): void {  
    const value = form.value;
    const tempId = this.editMode ? value.id : new Date().getMilliseconds().toString();
    
    const ingredient = new Ingredient(tempId, value.name, value.amount, value.metricUnit);
    this.editMode ? this.shoppingListService.updateIngredient(ingredient) : this.shoppingListService.addIngredient(ingredient);
  }

  onDeleteIngredient() {
    
  }

  onClearIngredient() {
    this.formRef.resetForm();
    this.editMode = false;
  }
}
