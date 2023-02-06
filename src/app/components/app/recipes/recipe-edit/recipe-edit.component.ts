import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { appResolvers } from 'src/app/constants/constants';
import { RecipeEdit } from './resolver/recipe-edit-resolver';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeEdit: RecipeEdit;

  constructor(
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => { 
      this.recipeEdit = data[appResolvers.RECIPE_EDIT]; 
    });

  }
}
