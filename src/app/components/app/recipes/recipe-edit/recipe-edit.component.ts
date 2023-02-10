import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { appResolvers } from 'src/app/constants/constants';
import { MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
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
  recipeForm: FormGroup;
  srcImage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService) {

  }

  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;  
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => { 
      this.recipeEdit = data[appResolvers.RECIPE_EDIT];
      this.recipeForm = this.recipeEdit.form;
      if(this.recipeEdit.editMode) {
        this.srcImage = this.recipeEdit.get.imagePath;
      }
    });
  }

  onSubmit():void {
    console.log(this.recipeForm);
  }

  onAddIngedient(): void {
    this.controls.push(this.ingredientsService.getEmptyForm())
  }

}
