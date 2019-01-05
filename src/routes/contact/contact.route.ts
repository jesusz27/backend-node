import { ContactController } from "../../controllers/contact.controller";
import { TokenService } from "../../services/token.service";
import express from "express";

const contactRoutes = express.Router();
const contactController: ContactController = new ContactController();
const tokenService: TokenService = new TokenService();

const ID = "/:id";
const STATUS = "/:status";

contactRoutes.post("", tokenService.isAuth, (req, res) => {
    contactController.create(req, res);
});
contactRoutes.get("/:idUser", tokenService.isAuth, (req, res) => {
    contactController.findByCodUser(req, res);
});
contactRoutes.put(ID + "/status" + STATUS, tokenService.isAuth, (req, res) => {
    contactController.update(req, res);
});
contactRoutes.delete(ID, tokenService.isAuth, (req, res) => {
    contactController.delete(req, res);
});
export default contactRoutes;
