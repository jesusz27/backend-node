import express from "express";

import dbRoutes from "./db/db.route";
import userRoutes from "./user/user.route";
import contactRoutes from "./contact/contact.route";
const api = express.Router();

api.use("/db", dbRoutes);
api.use("/user", userRoutes);
api.use("/contact", contactRoutes);

export default api;