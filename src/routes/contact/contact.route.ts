import { ContactController } from "../../controllers/contact.controller";
import express from "express";

const contactRoutes = express.Router();
const contactController: ContactController = new ContactController();

contactRoutes.post("", (req, res) => {
    contactController.delete(req, res);
});
contactRoutes.get("/:idUser", (req, res) => {
    contactController.findByCodUser(req, res);
});
export default contactRoutes;
