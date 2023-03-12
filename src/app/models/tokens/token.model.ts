export class Token {

    constructor(
        public token: string,
        public tokenExpirationDate: Date,
        public refreshToken: string
    ) { }

    static isValid(expirationDate: Date): boolean {
        return !expirationDate || new Date() > expirationDate;
    }

    static expirationDate(expiresIn: number): Date {
        return new Date(new Date().getTime() + (expiresIn * 1000));
        // 3600 from firebase * 1000 = 1hour
    }

    static expiresIn(tokenExpirationDate: Date): number {
        return new Date(tokenExpirationDate).getTime() - new Date().getTime();
    }

    static needToRefreshToken(tokenExpirationDate: Date): boolean {
        return this.expiresIn(tokenExpirationDate) < 120000;
        // < 2m
    }


}