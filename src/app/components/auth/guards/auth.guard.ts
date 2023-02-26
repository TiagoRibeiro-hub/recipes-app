import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { appRoute } from "src/app/constants/routes";
import { Token } from "src/app/models/tokens/token.model";
import { AuthFirebaseService } from "src/app/services/auth/firebase/auth.firebase.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(
        private authService: AuthFirebaseService,
        private router: Router
    ) { }

    async isAuthenticated(): Promise<boolean> {
        const user = this.authService.user;
        if (user) {
            if(Token.needToRefreshToken(user.token.tokenExpirationDate)){
                // refresh
            }
            return true;
        }
        return this.router.navigate([appRoute.AUTH]);;
    }
}

export const authGuard = (authGuard = inject(AuthGuard)) => authGuard.isAuthenticated();