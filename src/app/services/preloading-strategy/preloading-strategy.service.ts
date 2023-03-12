import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { appRoute } from "@constants/routes";
import { AuthFirebaseService } from "@services/auth/firebase/auth.firebase.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PreloadingStrategyService implements PreloadingStrategy {

    constructor(
        private authService: AuthFirebaseService
    ) { }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        let loading = false;
        if (route.path) {
            switch (route.path) {
                case appRoute.AUTH:
                    if (!this.authService.isAuthenticated()) {
                        loading = true;
                    };
                    break;
            }
        }
        return loading ? load() : of(null);
    }
}