"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const fileUpload = require("express-fileupload");
const userRoutes = express_1.default.Router();
const userController = new user_controller_1.UserController();
userRoutes.get("/:idUser", (req, res) => {
    userController.findByIdUser(req, res);
});
userRoutes.get("", (req, res) => {
    userController.findAll(req, res);
});
userRoutes.put("/notification", (req, res) => {
    userController.updateIdNotification(req, res);
});
userRoutes.put("/pass", (req, res) => {
    userController.updatePassword(req, res);
});
userRoutes.post("/avatar/:idUser", fileUpload(), (req, res) => {
    userController.updateAvatar(req, res);
});
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map