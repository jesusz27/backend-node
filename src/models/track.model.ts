import { User } from "./user.model";
import { TrackDetail } from "./trackDetail.model";
export class Track {
    private _id: number;
    private codUser: User;
    private codContact: User;
    private trackDetail: TrackDetail;
    constructor() {
    }
    public getId(): number {
        return this._id;
    }
    public getCodUser(): User {
        return this.codUser;
    }
    public getCodContat(): User {
        return this.codUser;
    }
    public getTrackDetail(): TrackDetail {
        return this.trackDetail;
    }
    public setId(id: number) {
        this._id = id;
    }
    public setCodUser(codUser: User) {
        this.codUser = codUser;
    }
    public setCodContact(codContact: User) {
        this.codContact = codContact;
    }
    public setTrackDetail(trackDetail: TrackDetail) {
        this.trackDetail = trackDetail;
    }
}