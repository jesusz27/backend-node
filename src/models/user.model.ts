
export class User  {
    private _id: number;
    private idUser: string;

    constructor(idUser: string) {
        this.idUser = idUser;
    }
    public setId(id: number) {
        this._id = id;
    }
    public getIdUser(): string {
        return this.idUser;
    }
    public setIdUser(idUser: string) {
        this.idUser = idUser;
    }
    public getId(): number {
        return this._id;
    }

}