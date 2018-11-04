"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Person = new mongoose_1.default.Schema({
    firstName: { type: String },
    lastName: { type: String },
    birthdate: { type: Date },
    phone: { type: Number },
    user: { type: [mongoose_1.default.Schema.Types.ObjectId], ref: "User", autopopulate: true },
});
Person.plugin(require(`mongoose-autopopulate`));
const PersonSchema = mongoose_1.default.model("Person", Person);
exports.default = PersonSchema;
//# sourceMappingURL=person.schema.js.map