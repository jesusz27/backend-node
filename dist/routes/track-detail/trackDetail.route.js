"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trackDetail_controller_1 = require("../../controllers/trackDetail.controller");
const token_service_1 = require("../../services/token.service");
const express_1 = __importDefault(require("express"));
const trackDetailRoutes = express_1.default.Router();
const trackDetailController = new trackDetail_controller_1.TrackDetailController();
const tokenService = new token_service_1.TokenService();
trackDetailRoutes.get("/:idTrackDetail", tokenService.isAuth, (req, res) => {
    trackDetailController.findByIdTrack(req, res);
});
trackDetailRoutes.get("/id/:id", tokenService.isAuth, (req, res) => {
    trackDetailController.findById(req, res);
});
exports.default = trackDetailRoutes;
//# sourceMappingURL=trackDetail.route.js.map