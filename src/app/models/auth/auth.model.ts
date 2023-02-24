import { BaseModel } from "../baseModel";

export class AuthModel extends BaseModel {
    constructor(
        public id: string,
        public email: string,
        public userName: string,
        public password: string,
        public confirmPassword: string,
    ) {
        super(id);
    }

    static empty(): AuthModel {
        return new AuthModel('', '', '', '', '')
      }
}