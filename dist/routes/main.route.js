"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_route_1 = __importDefault(require("./db/db.route"));
const user_route_1 = __importDefault(require("./user/user.route"));
const contact_route_1 = __importDefault(require("./contact/contact.route"));
const track_route_1 = __importDefault(require("./track/track.route"));
const trackDetail_route_1 = __importDefault(require("./track-detail/trackDetail.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const person_route_1 = __importDefault(require("./person/person.route"));
const api = express_1.default.Router();
api.use("/db", db_route_1.default);
api.use("/user", user_route_1.default);
api.use("/contact", contact_route_1.default);
api.use("/track", track_route_1.default);
api.use("/trackDetail", trackDetail_route_1.default);
api.use("/auth", auth_route_1.default);
api.use("/person", person_route_1.default);
exports.default = api;
//# sourceMappingURL=main.route.js.map