import { User } from "../user.model";

export class UserBuilder {
    private user: User;
    constructor(idUser: string) {
        this.user = new User(idUser);
    }
    setId(id: number) {
        this.user.setId(id);
        return this;
    }
    setName(idUser: string) {
        this.user.setIdUser(idUser);
        return this;
    }
    build(): User {
        return this.user;
    }

}