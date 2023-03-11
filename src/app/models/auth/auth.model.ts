import { BaseModel } from "@models/baseModel";

export class AuthModel extends BaseModel {
    constructor(
        public override id: string,
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