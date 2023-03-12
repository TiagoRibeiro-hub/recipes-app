import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Token } from "@models/tokens/token.model";
import { User } from "@models/user/user.model";
import { Observable, take, exhaustMap, tap } from "rxjs";
import { AuthFirebaseService } from "../firebase/auth.firebase.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthFirebaseService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }
        if(Token.needToRefreshToken(user.tokenExpirationDate)) {
          this.authService.refreshToken(user.refrehToken);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token.token)
        });
        return next.handle(modifiedReq);
      })
    )
  }
}
