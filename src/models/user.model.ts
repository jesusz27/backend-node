
export class User {
    private _id: number;
    private idUser: string;
    private password: string;
    private email: string;

    constructor(idUser: string) {
        this.idUser = idUser;
    }
    public setId(id: number) {
        this._id = id;
    }
    public setIdUser(idUser: string) {
        this.idUser = idUser;
    }
    public setPassword(password: string) {
        this.password = password;
    }
    public setEmail(email: string) {
        this.email = email;
    }
    public getIdUser(): string {
        return this.idUser;
    }
    public getEmail(): string {
        return this.email;
    }
    public getPassword(): string {
        return this.password;
    }

    public getId(): number {
        return this._id;
    }

}