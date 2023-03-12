import { BaseModel } from "@models/baseModel";
import { Token } from "@models/tokens/token.model";
import { IUser } from "./user.interface";

export class User extends BaseModel {
    constructor(
        public override id: string,
        public email: string,
        public userName: string,
        private _token: Token
    ) {
        super(id);
    }

    set token(token: Token) {
        this._token = token;
    }

    get token(): Token {
        if(Token.isValid(this._token.tokenExpirationDate)){
            return this._token; 
        }
        return null;
    }

    get tokenId(): string {
        return this._token.token;
    }

    get tokenExpirationDate(): Date {
        return this._token.tokenExpirationDate;
    }

    get refreshToken(): string {
        return this._token.refreshToken;
    }

    static getUser(user: IUser): User {
        return new User(
            user.id,
            user.email,
            user.userName,
            user.token
        );
    }

    static setIUser(user: User): IUser {
       return {
            id: user.id,
            email: user.email,
            userName: user.userName,
            token: {
                token: user.tokenId,
                tokenExpirationDate: Token.expirationDate(+user.tokenExpirationDate),
                refreshToken: user.refreshToken
            }
       }
    }
}