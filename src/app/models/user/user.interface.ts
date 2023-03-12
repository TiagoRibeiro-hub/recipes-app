import { Token } from "@models/tokens/token.model";


export interface IUser {
    id: string;
    email: string;
    userName: string;
    token: Token
}