import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthFirebaseService } from '@services/auth/firebase/auth.firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'advanced-preloading';

  constructor(
    private authService: AuthFirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.autoSignIn();
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.activatedRoute.children) {
            const childRoutes = this.activatedRoute.children;
            childRoutes.forEach((childRoute) => {
              console.log(childRoute)
              childRoute.routeConfig.children?.forEach((route) => {
                console.log("route"+route)
                if (!route.canActivate && route.loadChildren && route.data?.preload) {
                  route[this.loadChildren]?.();
                }
              });
            });
          }
        }
      });
    }
    S
    private get loadChildren(): string {
      return 'loadChildren';
  }
}

