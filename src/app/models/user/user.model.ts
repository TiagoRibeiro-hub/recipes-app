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

    get token(): string {
        if (Token.isValid(this._token.tokenExpirationDate)) {
            return null;
        };
        return this._token.token;
    }

    get tokenExpirationDate(): Date {
        return this._token.tokenExpirationDate;
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