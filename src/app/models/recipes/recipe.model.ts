import { Ingredient } from "../ingredients/ingredient.model";

export class Recipe {
    constructor(
        public id: string,
        public name: string, 
        public description: string, 
        public imagePath: string,
        public ingredients: Ingredient[] = []) { }
}

export class EmptyRecipe {
    static get(): Recipe {
        return new Recipe("", "", "", "", [])
    }
}
