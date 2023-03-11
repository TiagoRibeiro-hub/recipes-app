export const appConstants = {
    SRC_IMG_TEMP: '../../assets/imgs/food_template.png',
}

export const appResolvers = {
    RECIPE_DETAIL: 'recipeDetail',
    RECIPE_EDIT: 'recipeEdit',
}

export const appRegex = {
    POSITIVE_NR: /^[+]?([.]\d+|\d+[.]?\d*)$/,
    USERNAME: /^[a-zA-ZãáàéêíóõúçÃÁÀÉÊÍÓÕÚÇ1234567890._!-@\s].{5,19}$/,
    PASSWORD: /^(?=.*\d{2})+(?=.*[\!@#$%|{[(=+\-)\]}_&*]{2})+(?=.*[a-z]{3})+(?=.*[A-Z]{3})+.{10,}$/,
}

