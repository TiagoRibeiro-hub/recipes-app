import { Injectable } from "@angular/core";
import { NavigationEnd, PreloadingStrategy, Route, Router } from "@angular/router";
import { appRoute } from "@constants/routes";
import { AuthFirebaseService } from "@services/auth/firebase/auth.firebase.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PreloadingStrategyService implements PreloadingStrategy {

    constructor(
        private authService: AuthFirebaseService,
        private router: Router  
    ) { }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        console.log(route);

        let loading = false;
        if (route.path) {
            switch (route.path) {
                case appRoute.AUTH:
                    if(!this.isAuthenticated()){
                        loading = true;
                    }
                    break;
                case appRoute.RECIPES:
                    if(this.isAuthenticated()){
                        loading = true;
                    }
                    break;
                case appRoute.NEW:
                case ':id':
                    loading = true;
                    break;
                case ':id/'+appRoute.EDIT:
                    if(this.router.url.includes("/recipes/")){
                        loading = true;
                    };
                    break;
            }
        }
        return loading ? load() : of(null);
    }

    private isAuthenticated() {
        if (this.authService._isAuthenticated) {
            return true;
        };
        return false;
    }
}
