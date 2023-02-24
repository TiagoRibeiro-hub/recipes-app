import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Operation } from 'src/app/models/enums/operation';
import { Ingredient, MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';
import { IngredientForms } from 'src/app/services/forms/ingredients/ingredient-form';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

export interface IngredientFormEvent {
  ingredient: Ingredient,
  operation: Operation
}

export interface IngredientFormEvent {
  ingredient: Ingredient,
  operation: Operation
}

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss']
})
export class IngredientsFormComponent implements OnInit {

  @Input() showAmount: boolean = true;
  
  @Output('ingredientFormEvent') ingredientFormEvent: EventEmitter<IngredientFormEvent> = new EventEmitter<IngredientFormEvent>();

  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  ingredientForm: FormGroup;

  editMode = false;
  editedIngredient: Ingredient;

  private ingredientEditing$: Subscription = undefined;
  
  constructor(
    private ingredientsService: IngredientsService,
    private ingredientForms: IngredientForms
  ) { }

  ngOnDestroy(): void {
    if (this.ingredientEditing$ !== undefined) {
      this.ingredientEditing$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.ingredientEditing$ = this.ingredientsService.ingredientEditing.subscribe((ingredient: Ingredient) => {
      this.editMode = true;
      this.ingredientForm = this.ingredientForms.getFormGroup(ingredient);
    });
    this.ingredientForm = this.ingredientForms.getFormGroup();
  }

  onSubmit(): void {

    // ID TEMP
    if (!this.editMode) {
      (<FormControl>this.ingredientForm.get('id')).setValue(
        (new Date().getMilliseconds() * 1.3).toString()
      );
    }

    this.ingredientFormEvent.emit({
      ingredient: this.ingredientForm.value,
      operation: this.editMode ? Operation.UPDATE : Operation.ADD
    });
    this.onClear();
  }

  onDelete() {
    this.ingredientFormEvent.emit({
      ingredient: this.ingredientForm.value,
      operation: Operation.DELETE
    });
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
