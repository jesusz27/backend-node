"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TrackDetail = new mongoose_1.default.Schema({
    idTrack: { type: String, required: true },
    locationStorage: { type: String, required: true },
});
const TrackDetailSchema = mongoose_1.default.model("TrackDetail", TrackDetail);
exports.default = TrackDetailSchema;
//# sourceMappingURL=trackDetail.schema.js.map