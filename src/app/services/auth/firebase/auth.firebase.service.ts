import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { appFirebase } from 'src/app/constants/constants';
import { IAuthManager } from 'src/app/models/auth/auth.interface';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { Token } from 'src/app/models/tokens/token.model';
import { IUser } from 'src/app/models/user/user.interface';
import { User } from 'src/app/models/user/user.model';
import { NavigationService } from '../../navigation/navigation.service';

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
export class AuthFirebaseService implements IAuthManager {

  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: NodeJS.Timeout = undefined;

  get user(): IUser {
    return JSON.parse(localStorage.getItem('userData'));
  }
  set user(user: IUser) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoSignOut(Token.expiresIn(user.token.tokenExpirationDate))
  }

  constructor(
    private http: HttpClient,
    private navigation: NavigationService) { }

  signUp(authModel: AuthModel): Observable<AuthFirebaseResponse> {

    return this.http
      .post<AuthFirebaseResponse>(
        appFirebase.SIGN_UP,
        this.setBody(authModel),
        {
          headers: this.setHeader()
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
      .post<AuthFirebaseResponse>(
        appFirebase.SIGN_IN,
        this.setBody(authModel),
        {
          headers: this.setHeader()
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

  autoSignOut(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDate);
  }

  setHeader() {
    return new HttpHeaders().set('firebase', 'true');
  }

  private setBody(authModel: AuthModel): any {
    return {
      email: authModel.email,
      password: authModel.password,
      returnSecureToken: true,
    };
  }

  private setUser(response: AuthFirebaseResponse, userName: string) {
    const user = {
      id: response.localId,
      email: response.email,
      userName: userName,
      token: {
        token: response.idToken,
        tokenExpirationDate: Token.expirationDate(+response.expiresIn)
      }
    }
    this.userSubject.next(User.getUser(user));
    this.user = user;
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
