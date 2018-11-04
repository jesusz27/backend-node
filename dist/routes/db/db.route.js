"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_controller_1 = require("../../controllers/db.controller");
const dbRoutes = express_1.default.Router();
const dbController = new db_controller_1.DbController();
dbRoutes.get("/seed", (req, res) => {
    dbController.seed(req, res);
});
dbRoutes.get("/saveInBackup", (req, res) => {
    dbController.saveInBackup(req, res);
});
dbRoutes.delete("/delete", (req, res) => {
    dbController.delete(req, res);
});
exports.default = dbRoutes;
//# sourceMappingURL=db.route.js.map