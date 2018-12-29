import { UserController } from "../../controllers/user.controller";
import express from "express";
const fileUpload = require("express-fileupload");
const userRoutes = express.Router();
const userController: UserController = new UserController();
userRoutes.get("/:idUser", (req, res) => {
    userController.findByIdUser(req, res);
});
userRoutes.get("", (req, res) => {
    userController.findAll(req, res);
});
userRoutes.patch("/idnotification", (req, res) => {
    userController.updateIdNotification(req, res);
});
userRoutes.patch("/password", (req, res) => {
    userController.updatePassword(req, res);
});
userRoutes.put("/:idUser/avatar", fileUpload(), (req: any, res) => {
    userController.updateAvatar(req, res);
});

export default userRoutes;
