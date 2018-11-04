"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const track_model_1 = require("../track.model");
class TrackBuilder {
    constructor() {
        this.trackModel = new track_model_1.Track();
    }
    setId(id) {
        this.trackModel.setId(id);
        return this;
    }
    setCodUser(codUser) {
        this.trackModel.setCodUser(codUser);
        return this;
    }
    setCodContact(codContact) {
        this.trackModel.setCodContact(codContact);
        return this;
    }
    setTrackDetail(trackDetail) {
        this.trackModel.setTrackDetail(trackDetail);
        return this;
    }
    setFecha(fecha) {
        this.trackModel.setFecha(fecha);
        return this;
    }
    build() {
        return this.trackModel;
    }
}
exports.TrackBuilder = TrackBuilder;
//# sourceMappingURL=track.builder.js.map