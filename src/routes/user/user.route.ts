import { UserController } from "../../controllers/user.controller";
import { TokenService } from "../../services/token.service";
import express from "express";
const fileUpload = require("express-fileupload");
const userRoutes = express.Router();
const userController: UserController = new UserController();
const tokenService: TokenService = new TokenService();
userRoutes.get("/:idUser", tokenService.isAuth, (req, res) => {
    userController.findByIdUser(req, res);
});
userRoutes.get("", tokenService.isAuth, (req, res) => {
    userController.findAll(req, res);
});
userRoutes.patch("/idnotification", tokenService.isAuth, (req, res) => {
    userController.updateIdNotification(req, res);
});
userRoutes.patch("/password", tokenService.isAuth, (req, res) => {
    userController.updatePassword(req, res);
});
userRoutes.put("/:idUser/avatar", fileUpload(), tokenService.isAuth,  (req: any, res) => {
    userController.updateAvatar(req, res);
});

export default userRoutes;
