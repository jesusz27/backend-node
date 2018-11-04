"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    idUser: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    idNotification: { type: String },
    avatar: { type: String },
});
const UserSchema = mongoose_1.default.model("User", User);
exports.default = UserSchema;
//# sourceMappingURL=user.schema.js.map