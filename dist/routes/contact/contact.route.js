"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_controller_1 = require("../../controllers/contact.controller");
const express_1 = __importDefault(require("express"));
const contactRoutes = express_1.default.Router();
const contactController = new contact_controller_1.ContactController();
const ID = "/:id";
const STATUS = "/:status";
contactRoutes.post("", (req, res) => {
    contactController.create(req, res);
});
contactRoutes.get("/:idUser", (req, res) => {
    contactController.findByCodUser(req, res);
});
contactRoutes.put(ID + "/status" + STATUS, (req, res) => {
    contactController.update(req, res);
});
contactRoutes.delete(ID, (req, res) => {
    contactController.delete(req, res);
});
exports.default = contactRoutes;
//# sourceMappingURL=contact.route.js.map