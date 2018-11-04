"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Track {
    constructor() {
    }
    getId() {
        return this._id;
    }
    getCodUser() {
        return this.codUser;
    }
    getCodContat() {
        return this.codUser;
    }
    getTrackDetail() {
        return this.trackDetail;
    }
    getFecha() {
        return this.fecha;
    }
    setId(id) {
        this._id = id;
    }
    setCodUser(codUser) {
        this.codUser = codUser;
    }
    setCodContact(codContact) {
        this.codContact = codContact;
    }
    setTrackDetail(trackDetail) {
        this.trackDetail = trackDetail;
    }
    setFecha(fecha) {
        this.fecha = fecha;
    }
}
exports.Track = Track;
//# sourceMappingURL=track.model.js.map