import { BaseModel } from "@models/baseModel";
import { IToken } from "@models/tokens/token.interface";
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

    set token(token: IToken) {
        this._token = {
            token: token.token,
            tokenExpirationDate: token.tokenExpirationDate,
            refreshToken: token.refreshToken
        }
    }

    get token(): IToken {
        if (Token.isValid(this._token.tokenExpirationDate)) {
            return null;
        };
        return this._token;
    }

    get tokenExpirationDate(): Date {
        return this._token.tokenExpirationDate;
    }

    get refrehToken(): string {
        return this._token.refreshToken;
    }

    static getUser(user: IUser): User {
        return new User(
            user.id,
            user.email,
            user.userName,
            user.token,
        )
    }
}