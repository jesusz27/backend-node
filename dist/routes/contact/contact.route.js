"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_controller_1 = require("../../controllers/contact.controller");
const token_service_1 = require("../../services/token.service");
const express_1 = __importDefault(require("express"));
const contactRoutes = express_1.default.Router();
const contactController = new contact_controller_1.ContactController();
const tokenService = new token_service_1.TokenService();
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
exports.default = contactRoutes;
//# sourceMappingURL=contact.route.js.map