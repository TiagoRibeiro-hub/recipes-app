import { appEnv } from "@env/environments";

export const appFirebase = {
    //https://firebase.google.com/docs/reference/rest/auth
    PATH: 'https://recipes-app-98e7e-default-rtdb.europe-west1.firebasedatabase.app/',
    SIGN_UP: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${appEnv.FIREBAE_KEY}`,
    SIGN_IN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${appEnv.FIREBAE_KEY}`,
    REFRESH_TOKEN: `https://securetoken.googleapis.com/v1/token?key=${appEnv.FIREBAE_KEY}`,
    UPDATE_PROFILE: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${appEnv.FIREBAE_KEY}`,
    RECIPES:  'recipes.json',
}
