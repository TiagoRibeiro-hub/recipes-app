import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface RecipeEdit {
    id: string;
    editMode: boolean;
}


@Injectable({
    providedIn: 'root'
  })
export class RecipeEditResolver implements Resolve<RecipeEdit> {

    constructor() { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeEdit | Observable<RecipeEdit> | Promise<RecipeEdit> {
        const id = route.params['id'];
        const editMode = id !== null || id !== undefined;
        return {
            id: id,
            editMode: editMode
        };        
    }

}