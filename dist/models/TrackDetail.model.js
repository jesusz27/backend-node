"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackDetail {
    constructor(idTrack) {
        this.idTrack = idTrack;
    }
    setId(id) {
        this._id = id;
    }
    getIdTrack() {
        return this.idTrack;
    }
    getLocationStorage() {
        return this.locationStorage;
    }
    setLocationStorage(locationStorage) {
        this.locationStorage = locationStorage;
    }
    setIdTrack(idTrack) {
        this.idTrack = idTrack;
    }
    getId() {
        return this._id;
    }
}
exports.TrackDetail = TrackDetail;
//# sourceMappingURL=trackDetail.model.js.map