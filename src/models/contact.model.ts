import { User } from "./user.model";

export class Contact {
    private _id: number;
    private codUser: User;
    private codContact: User;

    constructor() {
    }

    getId(): number {
        return this._id;
    }
    getCodUser(): User {
        return this.codUser;
    }
    getCodContact(): User {
        return this.codContact;
    }
    setId(id: number) {
        this._id = id;
    }
    setCodUser(codUser: User) {
        this.codUser = codUser;
    }
    setCodContact(codContact: User) {
        this.codContact = codContact;
    }
}