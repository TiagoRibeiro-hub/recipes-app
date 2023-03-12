import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

@Component({
    standalone: true,
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styles: [],
    imports: [RouterModule, RecipeListComponent]
})
export class RecipesComponent {

  constructor() {}
}
