import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { AuthModel } from "@models/auth/auth.model";
import { Token } from "@models/tokens/token.model";
import { IUser } from "@models/user/user.interface";
import { IAuthFirebaseResponse, IRefreshTokenFirebaseResponse } from "./firebase/auth.firebase.service";

export class AuthHelper {

    static setHeader() {
        return new HttpHeaders().set('firebase', 'true');
    }

    static setAuthBody(authModel: AuthModel): any {
        return {
            email: authModel.email,
            password: authModel.password,
            returnSecureToken: true,
        };
    }

    static setRefreshTokenBody(refreshToken: string): any {
        return {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };
    }

    static setUser(response: IAuthFirebaseResponse, userName: string): IUser {
        return {
            id: response.localId,
            email: response.email,
            userName: userName,
            token: {
                token: response.idToken,
                tokenExpirationDate: Token.expirationDate(+response.expiresIn),
                refreshToken: response.refreshToken
            }
        }
    }

    static setToken(response: IRefreshTokenFirebaseResponse): Token {
        return {
            token: response.id_token,
            tokenExpirationDate: Token.expirationDate(+response.expires_in),
            refreshToken: response.refresh_token
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
            default:
                errorMessage = 'Somenthing went wrong';
        }
        return errorMessage;
    }
}