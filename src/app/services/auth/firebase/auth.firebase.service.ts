import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { appFirebase } from 'src/app/constants/constants';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { User } from 'src/app/models/user/user.model';

export interface AuthFirebaseResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {

  userSubject = new BehaviorSubject<User>(null);
  user: User;

  private token: string;
  get userToken(): string {
    return this.token;
  }
  set userToken(token: string) {
    this.token = token;
  }

  constructor(private http: HttpClient) { }

  signUp(authModel: AuthModel): Observable<AuthFirebaseResponse> {

    return this.http
      .post<AuthFirebaseResponse>(appFirebase.SIGN_UP, this.setBody(authModel))
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.setUser(response, authModel.userName);
          this.http
            .post(appFirebase.UPDATE_PROFILE,
              {
                idToken: response.idToken,
                displayName: authModel.userName,
                returnSecureToken: false,
              })
            .pipe(
              catchError(error => throwError(() => new Error(error))),
            )
            .subscribe({
              error: (error: Error) => console.error(error)
            });
        })
      );
  }

  signIn(authModel: AuthModel): Observable<AuthFirebaseResponse> {
    return this.http
      .post<AuthFirebaseResponse>(appFirebase.SIGN_IN, this.setBody(authModel))
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.setUser(response, response.displayName);
        })
      );
  }

  logout(){
    this.userSubject.next(null);
  }
  
  private setBody(authModel: AuthModel): any {
    return {
      email: authModel.email,
      password: authModel.password,
      returnSecureToken: true,
    };
  }

  private setUser(response: AuthFirebaseResponse, userName: string) {
    this.user = new User(
      response.localId,
      response.email,
      userName,
      response.idToken,
      new Date(new Date().getTime() + (+response.expiresIn * 1000))
    );
    this.userToken = this.user.token;
    this.userSubject.next(this.user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let error: Observable<never>;
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      error = throwError(() => new Error(errorMessage));
    } else {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password';
          break;
        case 'USER_DISABLED':
          errorMessage = 'User is disabled by an administrator';
      }
      error = throwError(() => new Error(errorMessage));
    }
    return error;
  }
}
