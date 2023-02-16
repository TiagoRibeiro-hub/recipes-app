import { Component } from '@angular/core';
import { MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss']
})
export class IngredientsFormComponent {
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

}
