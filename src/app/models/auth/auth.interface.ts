import { Observable } from "rxjs";
import { AuthModel } from "./auth.model";

export interface IAuthManager {
    signUp(authModel: AuthModel): Observable<any>;
    signIn(authModel: AuthModel): Observable<any>;
    signOut();
}