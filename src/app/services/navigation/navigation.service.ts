import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appRoute } from 'src/app/constants/routes';

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
}
