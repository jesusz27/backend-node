import { TrackDetailController } from "../../controllers/trackDetail.controller";
import { TokenService } from "../../services/token.service";
import express from "express";

const trackDetailRoutes = express.Router();
const trackDetailController: TrackDetailController = new TrackDetailController();
const tokenService: TokenService = new TokenService();

trackDetailRoutes.get("/:idTrackDetail", tokenService.isAuth, (req, res) => {
    trackDetailController.findByIdTrack(req, res);
});
trackDetailRoutes.get("/id/:id", tokenService.isAuth, (req, res) => {
    trackDetailController.findById(req, res);
});
export default trackDetailRoutes;
