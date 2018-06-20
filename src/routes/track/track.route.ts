import { TrackController } from "../../controllers/track.controller";
import express from "express";

const trackRoutes = express.Router();
const trackController: TrackController = new TrackController();

trackRoutes.get("/:idTrack", (req, res) => {
    trackController.findByIdTrack(req, res);
});

export default trackRoutes;
