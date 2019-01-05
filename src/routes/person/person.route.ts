import { PersonController } from "../../controllers/person.controller";
import { TokenService } from "../../services/token.service";
import express from "express";

const personRoutes = express.Router();
const personController: PersonController = new PersonController();
const tokenService: TokenService = new TokenService();

personRoutes.post("/:idUser", tokenService.isAuth, (req, res) => {
    personController.create(req, res);
});
personRoutes.put("/:idUser", tokenService.isAuth, (req, res) => {
    personController.update(req, res);
});
personRoutes.get("/:idUser", tokenService.isAuth, (req, res) => {
    personController.findByIdUser(req, res);
});
export default personRoutes;
