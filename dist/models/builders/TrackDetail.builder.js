"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trackDetail_model_1 = require("../trackDetail.model");
class TrackDetailBuilder {
    constructor(idTrack) {
        this.trackDetail = new trackDetail_model_1.TrackDetail(idTrack);
    }
    setId(id) {
        this.trackDetail.setId(id);
        return this;
    }
    setIdTrack(idTrack) {
        this.trackDetail.setIdTrack(idTrack);
        return this;
    }
    setLocationStorage(locationStorage) {
        this.trackDetail.setLocationStorage(locationStorage);
        return this;
    }
    build() {
        return this.trackDetail;
    }
}
exports.TrackDetailBuilder = TrackDetailBuilder;
//# sourceMappingURL=trackDetail.builder.js.map