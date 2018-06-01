import express from "express";

import dbRoutes from "./db/db.route";
import userRoutes from "./user/user.route";

const api = express.Router();

api.use("/db", dbRoutes);
api.use("/user", userRoutes);

export default api;