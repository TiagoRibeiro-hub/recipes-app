import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { appResolvers } from 'src/app/constants/constants';
import { MetricUnitMapping, MetricUnitToDropDownForm } from 'src/app/models/ingredients/ingredient.model';
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
  srcImage: string;

  constructor(
    private activatedRoute: ActivatedRoute) {

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

  // get controls() { // a getter!
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  //   *ngFor="let ingredientCtrl of controls; let i = index"
  // }

}
