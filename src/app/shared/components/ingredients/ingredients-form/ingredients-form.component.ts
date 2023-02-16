import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss']
})
export class IngredientsFormComponent {
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  ingredientForm: FormGroup;
  editMode: boolean = false;
  
  onSubmit(): void {  


    

    this.onClear();
  }

  onDelete() {
    this.onClear();

  }

  onClear() {

    this.editMode = false;
  }
}
