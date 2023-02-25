import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appFirebase } from 'src/app/constants/constants';
import { AuthModel } from 'src/app/models/auth/auth.model';

export interface AuthFirebaseResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(
    private http: HttpClient
  ) { }

  signUp(authModel: AuthModel) {  
    return this.http.post<AuthFirebaseResponse>(
      appFirebase.SIGN_UP,
      {
        email: authModel.email,
        password: authModel.password,
        returnSecureToken: true
      });
  }
}
