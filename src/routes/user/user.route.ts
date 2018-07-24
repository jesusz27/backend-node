import { UserController } from "../../controllers/user.controller";
import express from "express";

const userRoutes = express.Router();
const userController: UserController = new UserController();

userRoutes.get("/:idUser", (req, res) => {
    userController.findByIdUser(req, res);
});
userRoutes.get("", (req, res) => {
    userController.findAll(req, res);
});
userRoutes.put("/notification", (req, res) => {
    userController.updateIdNotification(req, res);
});
export default userRoutes;
