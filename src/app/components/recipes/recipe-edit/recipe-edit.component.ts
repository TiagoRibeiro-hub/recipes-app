import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Data } from "@angular/router";
import { appConstants, appResolvers } from "@constants/constants";
import { MetricUnitMapping, MetricUnitToDropDownForm } from "@models/ingredients/ingredient.model";
import { IRecipeEdit } from "@models/recipes/recipes.interface";
import { SharedModule } from "@modules/shared/shared.module";
import { DataStorageService } from "@services/auth/firebase/data-storage.service";
import { IngredientFormService } from "@services/forms/ingredients/ingredient-form.service";
import { NavigationService } from "@services/navigation/navigation.service";
import { RecipeService } from "@services/recipes/recipe.service";

@Component({
  standalone: true,
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RecipeEditComponent implements OnInit {
  metricUnitMapping = MetricUnitMapping;
  metricUnitEnums = MetricUnitToDropDownForm;

  recipeEdit: IRecipeEdit;
  recipeForm: FormGroup;
  srcImage: string = appConstants.SRC_IMG_TEMP;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientsFromService: IngredientFormService,
    private navigationService: NavigationService,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  get formArray() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }
  get formArrayControls() {
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
  }

  onSubmit(): void {
    // Clean if ingredient is empty
    if (this.formArrayControls.length > 0) {
      for (var i = 0; i < this.formArrayControls.length; i++) {
        if((<FormControl>this.formArrayControls[i].get('name')).value == undefined){
          this.onDeleteIngredient(i);
        }
      }
    }

    const image = <FormControl>this.recipeForm.get('imagePath');
    if (image.value == '' || image.value == undefined) {
      image.setValue(appConstants.SRC_IMG_TEMP);
    }
    
    this.recipeEdit.editMode
      ? this.recipeService.update(this.recipeForm.value)
      : this.recipeService.add(this.recipeForm.value);

    this.dataStorageService.storeRecipes();
    this.onCancel();
  }

  onAddIngedient(): void {
    this.formArrayControls.push(this.ingredientsFromService.getFormGroup());
  }

  onDeleteIngredient(index: number): void {
      this.formArray.removeAt(index);
  }

  onCancel(): void {
    this.navigationService.navigatePrevious(this.activatedRoute);
  }

  onClear(): void {
    this.recipeForm.reset();
    this.formArray.clear();
    this.onAddIngedient();
  }

  onGroupFormValueChange(): void {
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
