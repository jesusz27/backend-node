"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Contact = new mongoose_1.default.Schema({
    codUser: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    codContact: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["SELECTED"] },
});
const ContactSchema = mongoose_1.default.model("Contact", Contact);
exports.default = ContactSchema;
//# sourceMappingURL=contact.schema.js.map