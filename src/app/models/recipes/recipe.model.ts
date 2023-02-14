import { BaseModel } from "../baseModel";
import { Ingredient } from "../ingredients/ingredient.model";

export class Recipe extends BaseModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public imagePath: string,
        public ingredients: Ingredient[] = []
    ) {
        super(id);
    }

    static empty(): Recipe {
        return new Recipe('', '', '', '', [])
    }

}

