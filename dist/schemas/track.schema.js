"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Track = new mongoose_1.default.Schema({
    codUser: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    codContact: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    trackDetail: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "TrackDetail", required: true },
    fecha: { type: Date },
});
const TrackSchema = mongoose_1.default.model("Track", Track);
exports.default = TrackSchema;
//# sourceMappingURL=track.schema.js.map