import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@models/user/user.model";
import { Observable, take, exhaustMap } from "rxjs";
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
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    )
  }
}
