import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appFirebase } from '@constants/firebase';
import { IAuthManager } from '@models/auth/auth.interface';
import { AuthModel } from '@models/auth/auth.model';
import { Token } from '@models/tokens/token.model';
import { IUser } from '@models/user/user.interface';
import { User } from '@models/user/user.model';
import { NavigationService } from '@services/navigation/navigation.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthHelper } from '../auth.helper';

// https://firebase.google.com/docs/reference/rest/auth#section-api-usage
export interface IAuthFirebaseResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
}

export interface IRefreshTokenFirebaseResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  localId: string;
  user_id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService implements IAuthManager {

  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: NodeJS.Timeout = undefined;

  get user(): IUser {
    return JSON.parse(localStorage.getItem('userData'));
  }

  set user(user: IUser) {
    localStorage.setItem('userData', JSON.stringify(user));
    if (Token.needToRefreshToken(user.token.tokenExpirationDate)) {
      this.refreshToken(user.token.refreshToken);
    }
    this.autoSignOut(Token.expiresIn(user.token.tokenExpirationDate))
  }

  constructor(
    private http: HttpClient,
    private navigation: NavigationService) { }

  signUp(authModel: AuthModel): Observable<IAuthFirebaseResponse> {
    return this.http
      .post<IAuthFirebaseResponse>(
        appFirebase.SIGN_UP,
        AuthHelper.setAuthBody(authModel),
        {
          headers: AuthHelper.setHeader()
        }
      )
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
              catchError(this.handleError),
            )
            .subscribe({
              error: (error: Error) => console.error('Sign Up Error: ' + error)
            });
        })
      );
  }

  signIn(authModel: AuthModel): Observable<IAuthFirebaseResponse> {
    return this.http
      .post<IAuthFirebaseResponse>(
        appFirebase.SIGN_IN,
        AuthHelper.setAuthBody(authModel),
        {
          headers: AuthHelper.setHeader()
        })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.setUser(response, response.displayName);
        })
      );
  }

  autoSignIn() {
    const userData = this.user;
    if (!userData) {
      return;
    }
    const loadedUser = User.getUser(userData);
    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
    }
  }

  signOut() {
    this.userSubject.next(null);
    this.navigation.toAuthenticated();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = undefined;
  }

  refreshToken(refreshToken: string): void {
    if(refreshToken == undefined) {
      this.navigation.toAuthenticated();
      return;
    }
    this.http
      .post<IRefreshTokenFirebaseResponse>(
        appFirebase.REFRESH_TOKEN,
        AuthHelper.setRefreshTokenBody(refreshToken)
      )
      .pipe(
        catchError(this.handleError),
        tap(response => {
          const userData = this.user;
          if (userData) {
            const loadedUser = User.getUser(userData);
            if (loadedUser.id === response.user_id) {
              loadedUser.token = AuthHelper.setToken(response);
              this.userSubject.next(loadedUser);
              this.user = loadedUser;
            }
          }
        })
      )
      .subscribe({
        error: (error: Error) => console.error('Refresh Token Error: ' + error)
      });
  }

  private autoSignOut(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDate);
  }

  private setUser(response: IAuthFirebaseResponse, userName: string) {
    const user = AuthHelper.setUser(response, userName);
    this.userSubject.next(User.getUser(user));
    this.user = user;
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let error: Observable<never>;
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      error = throwError(() => new Error(errorMessage));
    } else {
      errorMessage = AuthHelper.setErrorMessage(errorResponse, errorMessage);
      error = throwError(() => new Error(errorMessage));
    }
    return error;
  }


}
