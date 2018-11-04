"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const authRoutes = express_1.default.Router();
const authController = new auth_controller_1.AuthController();
authRoutes.post("/singup", (req, res) => {
    authController.singUp(req, res);
});
authRoutes.post("/login", (req, res) => {
    authController.logIn(req, res);
});
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map