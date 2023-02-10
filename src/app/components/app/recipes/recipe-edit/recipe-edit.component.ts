import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { appResolvers } from 'src/app/constants/constants';
import { MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
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
  srcImage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService,
    private recipeService: RecipeService
    ) { }

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
    if(this.controls.length > 0) {
      for(var i = 0; i < this.controls.length; i++) {
        (<FormControl>this.controls[i].get('id')).setValue(new Date().getMilliseconds().toString() + i);
      }
    }

    if (!this.recipeEdit.editMode) {
      (<FormControl>this.recipeForm.get('id')).setValue(new Date().getMilliseconds().toString());
      
    }
    
    this.recipeEdit.editMode ? this.recipeService.update(this.recipeForm.value) : this.recipeService.add(this.recipeForm.value);
  }

  onAddIngedient(): void {
    this.controls.push(this.ingredientsService.getEmptyForm())
  }

}
