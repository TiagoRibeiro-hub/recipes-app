import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { appRoute } from "@constants/routes";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  navigateRelativeTo(path: any[], relativeTo: ActivatedRoute): void {
    this.router.navigate(path, { relativeTo: relativeTo });
  }

  navigatePrevious(relativeTo: ActivatedRoute): void {
    this.router.navigate([appRoute.PREVIOUS], { relativeTo: relativeTo });
  }

  toAuthenticated(){
    this.router.navigate([appRoute.AUTH]);
  }

  toRecipes(){
    this.router.navigate([appRoute.RECIPES]);
  }

  toIngredients(){
    this.router.navigate([appRoute.INGREDIENTS]);
  }

  toShoppingList(){
    this.router.navigate([appRoute.SHOPPING_LIST]);
  }
}