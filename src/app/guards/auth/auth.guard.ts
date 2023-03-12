import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { appRoute } from "@constants/routes";
import { AuthFirebaseService } from "@services/auth/firebase/auth.firebase.service";

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return inject(AuthFirebaseService).isAuthenticated() ? true : inject(Router).navigate([appRoute.AUTH])
};
