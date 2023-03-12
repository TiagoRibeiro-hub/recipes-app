export interface IToken {
    token: string;
    tokenExpirationDate: Date;
    refreshToken: string;
}