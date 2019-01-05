import { TrackController } from "../../controllers/track.controller";
import { TokenService } from "../../services/token.service";
import express from "express";

const trackRoutes = express.Router();
const trackController: TrackController = new TrackController();
const tokenService: TokenService = new TokenService();

trackRoutes.get("/:idTrack", tokenService.isAuth, (req, res) => {
    trackController.findByIdTrack(req, res);
});
trackRoutes.get("/user/:idUser", tokenService.isAuth, (req, res) => {
    trackController.findByCodUser(req, res);
});
trackRoutes.get("/contact/:idUser", tokenService.isAuth, (req, res) => {
    trackController.findByCodContact(req, res);
});
export default trackRoutes;
