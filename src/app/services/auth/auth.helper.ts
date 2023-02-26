import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AuthModel } from "src/app/models/auth/auth.model";
import { Token } from "src/app/models/tokens/token.model";
import { IUser } from "src/app/models/user/user.interface";
import { AuthFirebaseResponse } from "./firebase/auth.firebase.service";

export class AuthHelper {

    static setHeader() {
        return new HttpHeaders().set('firebase', 'true');
    }

    static setBody(authModel: AuthModel): any {
        return {
            email: authModel.email,
            password: authModel.password,
            returnSecureToken: true,
        };
    }

    static setUser(response: AuthFirebaseResponse, userName: string): IUser {
        return {
            id: response.localId,
            email: response.email,
            userName: userName,
            token: {
                token: response.idToken,
                tokenExpirationDate: Token.expirationDate(+response.expiresIn)
            }
        }
    }

    static setErrorMessage(errorResponse: HttpErrorResponse, errorMessage: string) {
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
        return errorMessage;
    }
}