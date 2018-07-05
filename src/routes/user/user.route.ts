import { UserController } from "../../controllers/user.controller";
import express from "express";

const userRoutes = express.Router();
const userController: UserController = new UserController();

userRoutes.post("", (req, res) => {
    userController.create(req, res);
});
userRoutes.get("/:idUser", (req, res) => {
    userController.findByIdUser(req, res);
});

export default userRoutes;
