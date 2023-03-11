import { BaseModel } from "@models/baseModel";
import { Ingredient } from "@models/ingredients/ingredient.model";

export class Recipe extends BaseModel {
    constructor(
        public override id: string,
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

