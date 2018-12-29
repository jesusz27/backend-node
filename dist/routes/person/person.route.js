"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const person_controller_1 = require("../../controllers/person.controller");
const express_1 = __importDefault(require("express"));
const personRoutes = express_1.default.Router();
const personController = new person_controller_1.PersonController();
personRoutes.post("/:idUser", (req, res) => {
    personController.create(req, res);
});
personRoutes.put("/:idUser", (req, res) => {
    personController.update(req, res);
});
personRoutes.get("/:idUser", (req, res) => {
    personController.findByIdUser(req, res);
});
exports.default = personRoutes;
//# sourceMappingURL=person.route.js.map