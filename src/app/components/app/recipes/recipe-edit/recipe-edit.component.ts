import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { appConstants, appResolvers } from 'src/app/constants/constants';
import {
  MetricUnitMapping,
  MetricUnitToDropDownForm,
} from 'src/app/models/ingredients/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { RecipeEdit } from './resolver/recipe-edit-resolver';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  recipeEdit: RecipeEdit;
  recipeForm: FormGroup;
  srcImage: string = appConstants.SRC_IMG_TEMP;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsService: IngredientsService,
    private navigationService: NavigationService,
    private recipeService: RecipeService
  ) {}

  get formArray() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }
  get controls() {
    return this.formArray.controls;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.recipeEdit = data[appResolvers.RECIPE_EDIT];
      this.recipeForm = this.recipeEdit.form;
      if (this.recipeEdit.editMode && this.recipeEdit.get) {
        this.srcImage =
          this.recipeEdit.get.imagePath == undefined ||
          this.recipeEdit.get.imagePath == ''
            ? this.srcImage
            : this.recipeEdit.get.imagePath;
      }
    });
    this.onGroupFormValueChange();
    console.log(this.controls);
  }

  onSubmit(): void {
    if (this.formArray.length > 0) {
    }

    // ID TEMP
    if (this.controls.length > 0) {
      for (var i = 0; i < this.controls.length; i++) {
        (<FormControl>this.controls[i].get('id')).setValue(
          new Date().getMilliseconds().toString() + i
        );
      }
    }

    if (!this.recipeEdit.editMode) {
      (<FormControl>this.recipeForm.get('id')).setValue(
        new Date().getMilliseconds().toString()
      );
    }
    const image = <FormControl>this.recipeForm.get('imagePath');
    if (image.value == '') {
      image.setValue(appConstants.SRC_IMG_TEMP);
    }
    this.recipeEdit.editMode
      ? this.recipeService.update(this.recipeForm.value)
      : this.recipeService.add(this.recipeForm.value);

    this.onCancel();
  }

  onAddIngedient(): void {
    this.controls.push(this.ingredientsService.getEmptyForm());
  }

  onDeleteIngredient(index: number): void {
    this.formArray.removeAt(index);
  }

  onCancel(): void {
    this.navigationService.navigatePrevious(this.activatedRoute);
  }

  onGroupFormValueChange() {
    const initialValue = this.recipeForm.value;
    this.recipeForm.valueChanges.subscribe((form) => {
      Object.keys(initialValue).some((key) => {
        const actualValue = this.recipeForm.value[key];
        if (actualValue != initialValue[key] && key == 'imagePath') {
          this.srcImage =
            actualValue == '' ? appConstants.SRC_IMG_TEMP : actualValue;
        }
      });
    });
  }
}
