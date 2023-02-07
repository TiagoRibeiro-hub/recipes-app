import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { appResolvers } from 'src/app/constants/constants';
import { MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';
import { RecipeEdit } from './resolver/recipe-edit-resolver';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  recipeEdit: RecipeEdit;
  recipeForm: FormGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => { 
      this.recipeEdit = data[appResolvers.RECIPE_EDIT]; 
      this.recipeForm = this.recipeEdit.form
    });
  }

  onSubmit():void {
    console.log(this.recipeForm);
  }

}
