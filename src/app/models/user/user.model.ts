import { BaseModel } from "../baseModel";

export class User extends BaseModel {
    map(arg0: (recipe: any) => any): any {
      throw new Error('Method not implemented.');
    }
    constructor(
        public id: string,
        public email: string,
        public userName: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {
        super(id);
    }

    get token(): string {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        };
        return this._token;
    }


}