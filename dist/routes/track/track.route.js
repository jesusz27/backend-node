"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_controller_1 = require("../../controllers/track.controller");
const token_service_1 = require("../../services/token.service");
const express_1 = __importDefault(require("express"));
const trackRoutes = express_1.default.Router();
const trackController = new track_controller_1.TrackController();
const tokenService = new token_service_1.TokenService();
trackRoutes.get("/:idTrack", tokenService.isAuth, (req, res) => {
    trackController.findByIdTrack(req, res);
});
trackRoutes.get("/user/:idUser", tokenService.isAuth, (req, res) => {
    trackController.findByCodUser(req, res);
});
trackRoutes.get("/contact/:idUser", tokenService.isAuth, (req, res) => {
    trackController.findByCodContact(req, res);
});
exports.default = trackRoutes;
//# sourceMappingURL=track.route.js.map