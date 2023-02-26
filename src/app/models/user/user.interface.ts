import { Token } from "../tokens/token.model";

export interface IUser {
    id: string;
    email: string;
    userName: string;
    token: Token
    // token: string;
    // tokenExpirationDate: Date;
}